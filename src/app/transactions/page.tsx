import { AppShell } from "@/components/finance/app-shell";
import { TransactionForm } from "@/components/finance/transaction-form";
import { TransactionRow } from "@/components/finance/transaction-row";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

export default async function TransactionsPage() {
  const user = await requireUser();
  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return (
    <AppShell
      activePage="transactions"
      pageTitle="Transaksi"
      subtitle="Pemasukan dan pengeluaran"
      userName={user.name ?? user.email ?? "pengguna"}
    >
      <section
        aria-labelledby="create-transaction-heading"
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
      >
        <h2
          className="mb-5 text-lg font-semibold text-gray-900"
          id="create-transaction-heading"
        >
          Catat transaksi
        </h2>
        <TransactionForm />
      </section>

      <section
        aria-labelledby="transaction-history-heading"
        className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900" id="transaction-history-heading">
          Riwayat transaksi
        </h2>
        {transactions.length > 0 ? (
          <ul className="mt-2">
            {transactions.map((transaction) => (
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
            Belum ada transaksi. Isi formulir di atas untuk mulai mencatat.
          </p>
        )}
      </section>
    </AppShell>
  );
}
