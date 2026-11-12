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
    <li className="grid gap-4 border-t border-gray-100 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-medium text-gray-900">{transaction.category}</h3>
          <p
            className={`font-semibold tabular-nums ${
              isIncome ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {isIncome ? "Pemasukan" : "Pengeluaran"} · {formatDate(new Date(`${transaction.date}T00:00:00.000Z`))}
          {transaction.note ? ` · ${transaction.note}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <details className="relative">
          <summary className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Ubah
          </summary>
          <div className="absolute right-0 z-10 mt-2 w-[min(90vw,36rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
            <TransactionForm initialValue={transaction} />
          </div>
        </details>
        <DeleteTransactionButton id={transaction.id} />
      </div>
    </li>
  );
}
