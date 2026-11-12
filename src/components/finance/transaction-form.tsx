"use client";

import { useActionState } from "react";
import { ActionFeedback } from "@/components/finance/action-feedback";
import { initialActionState } from "@/lib/action-state";
import {
  createTransaction,
  updateTransaction,
} from "@/app/transactions/actions";

export type TransactionFormValue = {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: string;
  category: string;
  note: string;
  date: string;
};

export function TransactionForm({
  initialValue,
}: {
  initialValue?: TransactionFormValue;
}) {
  const action = initialValue ? updateTransaction : createTransaction;
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  return (
    <form action={formAction} className="space-y-4">
      {initialValue && <input name="id" type="hidden" value={initialValue.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700">
          Jenis
          <select
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900"
            defaultValue={initialValue?.type ?? "EXPENSE"}
            name="type"
          >
            <option value="INCOME">Pemasukan</option>
            <option value="EXPENSE">Pengeluaran</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Nominal (Rp)
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
            defaultValue={initialValue?.amount}
            inputMode="decimal"
            maxLength={15}
            name="amount"
            placeholder="Contoh: 50000"
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Kategori
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
            defaultValue={initialValue?.category}
            maxLength={60}
            name="category"
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Tanggal
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
            defaultValue={
              initialValue?.date ?? new Date().toISOString().slice(0, 10)
            }
            name="date"
            required
            type="date"
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-gray-700">
        Catatan (opsional)
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
          defaultValue={initialValue?.note ?? ""}
          maxLength={240}
          name="note"
        />
      </label>
      <ActionFeedback state={state} />
      <button
        className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending
          ? "Menyimpan..."
          : initialValue
            ? "Simpan perubahan"
            : "Simpan transaksi"}
      </button>
    </form>
  );
}
