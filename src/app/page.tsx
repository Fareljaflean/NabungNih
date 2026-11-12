import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { AppShell } from "@/components/finance/app-shell";
import { CashFlowChart } from "@/components/finance/cash-flow-chart";
import { SavingsGoalCard } from "@/components/finance/savings-goal-card";
import { TransactionRow } from "@/components/finance/transaction-row";
import { buildSevenDayCashFlow, getSevenDayWindow } from "@/lib/dashboard";
import { formatCurrency } from "@/lib/finance";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

export default async function Home() {
  const user = await requireUser();
  const cashFlowWindow = getSevenDayWindow(new Date());
  const [
    incomeAggregate,
    expenseAggregate,
    recentTransactions,
    goals,
    cashFlowTransactions,
  ] = await Promise.all([
    prisma.transaction.aggregate({
      where: { userId: user.id, type: "INCOME" },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { userId: user.id, type: "EXPENSE" },
      _sum: { amount: true },
    }),
    prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      take: 5,
    }),
    prisma.savingsGoal.findMany({
      where: { userId: user.id },
      orderBy: { deadline: "asc" },
      take: 3,
    }),
    prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: cashFlowWindow.startAt,
          lte: cashFlowWindow.endAt,
        },
      },
      select: { amount: true, date: true, type: true },
    }),
  ]);

  const income = incomeAggregate._sum.amount ?? new Prisma.Decimal(0);
  const expenses = expenseAggregate._sum.amount ?? new Prisma.Decimal(0);
  const balance = income.minus(expenses);
  const cashFlow = buildSevenDayCashFlow(
    cashFlowTransactions.map((transaction) => ({
      amount: transaction.amount.toString(),
      date: transaction.date,
      type: transaction.type,
    })),
    cashFlowWindow.startAt,
  );

  return (
    <AppShell
      activePage="dashboard"
      pageTitle="Dashboard"
      subtitle="Ringkasan keuangan"
      userName={user.name ?? user.email ?? "pengguna"}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section
          aria-labelledby="balance-heading"
          className="finance-card finance-card--balance flex flex-col justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-emerald-900/75">
              Saldo saat ini
            </p>
            <h2
              className="money mt-3 break-all text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
              id="balance-heading"
            >
              {formatCurrency(balance.toString())}
            </h2>
            <p className="mt-2 text-sm text-emerald-950/65">
              Selisih dari seluruh pemasukan dan pengeluaran
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-emerald-950/15 pt-5">
            <div className="min-w-0">
              <p className="text-sm text-emerald-950/65">Pemasukan</p>
              <p className="money mt-1 break-all text-lg font-semibold text-emerald-800 md:text-xl">
                {formatCurrency(income.toString())}
              </p>
            </div>
            <div className="min-w-0 border-l border-emerald-950/15 pl-4">
              <p className="text-sm text-emerald-950/65">Pengeluaran</p>
              <p className="money mt-1 break-all text-lg font-semibold text-red-700 md:text-xl">
                {formatCurrency(expenses.toString())}
              </p>
            </div>
          </div>
        </section>
        <CashFlowChart days={cashFlow} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section
          aria-labelledby="transactions-heading"
          className="finance-card min-w-0"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              className="text-lg font-semibold tracking-tight text-ink md:text-xl"
              id="transactions-heading"
            >
              Transaksi terbaru
            </h2>
            <Link
              className="shrink-0 text-sm font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"
              href="/transactions"
            >
              Lihat semua
            </Link>
          </div>
          {recentTransactions.length > 0 ? (
            <ul className="mt-2">
              {recentTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={{
                    id: transaction.id,
                    type: transaction.type,
                    amount: transaction.amount.toString(),
                    category: transaction.category,
                    note: transaction.note ?? "",
                    date: transaction.date.toISOString().slice(0, 10),
                  }}
                />
              ))}
            </ul>
          ) : (
            <p className="mt-5 border-t border-line pt-5 text-sm leading-6 text-muted">
              Belum ada transaksi.{" "}
              <Link className="font-semibold text-emerald-800 underline underline-offset-4" href="/transactions">
                Catat transaksi pertamamu.
              </Link>
            </p>
          )}
        </section>

        <section
          aria-labelledby="savings-heading"
          className="finance-card min-w-0"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              className="text-lg font-semibold tracking-tight text-ink md:text-xl"
              id="savings-heading"
            >
              Target tabungan
            </h2>
            <Link
              className="shrink-0 text-sm font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"
              href="/savings"
            >
              Kelola
            </Link>
          </div>
          {goals.length > 0 ? (
            <div className="mt-4 divide-y divide-line">
              {goals.map((goal) => (
                <SavingsGoalCard
                  compact
                  goal={{
                    id: goal.id,
                    targetName: goal.targetName,
                    targetAmount: goal.targetAmount.toString(),
                    currentAmount: goal.currentAmount.toString(),
                    deadline: goal.deadline.toISOString().slice(0, 10),
                  }}
                  key={goal.id}
                />
              ))}
            </div>
          ) : (
            <p className="mt-5 border-t border-line pt-5 text-sm leading-6 text-muted">
              Belum ada target tabungan.{" "}
              <Link className="font-medium text-emerald-800 underline underline-offset-4" href="/savings">
                Buat target pertamamu.
              </Link>
            </p>
          )}
        </section>
      </div>
    </AppShell>
  );
}
