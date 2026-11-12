import { DeleteTransactionButton } from "@/components/finance/delete-transaction-button";
import {
  TransactionForm,
  type TransactionFormValue,
} from "@/components/finance/transaction-form";
import { formatCurrency, formatDate } from "@/lib/finance";

export function TransactionRow({
  transaction,
}: {
  transaction: TransactionFormValue;
}) {
  const isIncome = transaction.type === "INCOME";

  return (
    <li className="grid gap-3 border-t border-line py-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-semibold text-ink">{transaction.category}</h3>
          <p
            className={`money font-semibold ${
              isIncome ? "text-emerald-800" : "text-red-700"
            }`}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </p>
        </div>
        <p className="mt-1 text-sm text-muted">
          {isIncome ? "Pemasukan" : "Pengeluaran"} · {formatDate(new Date(`${transaction.date}T00:00:00.000Z`))}
          {transaction.note ? ` · ${transaction.note}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <details className="relative">
          <summary className="flex min-h-11 cursor-pointer items-center rounded-lg border border-line px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white">
            Ubah
          </summary>
          <div className="absolute right-0 z-10 mt-2 w-[min(90vw,36rem)] border border-line bg-white p-4 shadow-lg">
            <TransactionForm initialValue={transaction} />
          </div>
        </details>
        <DeleteTransactionButton id={transaction.id} />
      </div>
    </li>
  );
}
