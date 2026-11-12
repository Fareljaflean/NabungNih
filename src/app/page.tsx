import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { AppShell } from "@/components/finance/app-shell";
import { SavingsGoalCard } from "@/components/finance/savings-goal-card";
import { TransactionRow } from "@/components/finance/transaction-row";
import { formatCurrency } from "@/lib/finance";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

export default async function Home() {
  const user = await requireUser();
  const [incomeAggregate, expenseAggregate, recentTransactions, goals] =
    await Promise.all([
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
    ]);

  const income = incomeAggregate._sum.amount ?? new Prisma.Decimal(0);
  const expenses = expenseAggregate._sum.amount ?? new Prisma.Decimal(0);
  const balance = income.minus(expenses);

  return (
    <AppShell
      activePage="dashboard"
      pageTitle="Dashboard"
      subtitle="Ringkasan keuangan"
      userName={user.name ?? user.email ?? "pengguna"}
    >
      <section aria-labelledby="balance-heading">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-600" id="balance-heading">
                Total saldo
              </h2>
              <p className="mt-2 text-3xl font-bold tabular-nums text-gray-900 md:text-4xl">
                {formatCurrency(balance.toString())}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Pemasukan</p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-emerald-700">
                  {formatCurrency(income.toString())}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Pengeluaran</p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-red-600">
                  {formatCurrency(expenses.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="transactions-heading"
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900" id="transactions-heading">
              Transaksi terbaru
            </h2>
            <Link
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              href="/transactions"
            >
              Semua transaksi
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
            <p className="mt-3 text-sm text-gray-500">
              Belum ada transaksi.{" "}
              <Link className="font-medium text-emerald-700" href="/transactions">
                Catat transaksi pertamamu.
              </Link>
            </p>
          )}
        </section>

        <section
          aria-labelledby="savings-heading"
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900" id="savings-heading">
              Target tabungan
            </h2>
            <Link
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              href="/savings"
            >
              Kelola target
            </Link>
          </div>
          {goals.length > 0 ? (
            <div className="mt-4 space-y-4">
              {goals.map((goal) => (
                <SavingsGoalCard
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
            <p className="mt-3 text-sm text-gray-500">
              Belum ada target tabungan.{" "}
              <Link className="font-medium text-emerald-700" href="/savings">
                Buat target pertamamu.
              </Link>
            </p>
          )}
        </section>
      </div>
    </AppShell>
  );
}
