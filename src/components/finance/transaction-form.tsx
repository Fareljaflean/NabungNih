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
        <label className="field-label">
          Jenis
          <select
            className="field-control"
            defaultValue={initialValue?.type ?? "EXPENSE"}
            name="type"
          >
            <option value="INCOME">Pemasukan</option>
            <option value="EXPENSE">Pengeluaran</option>
          </select>
        </label>
        <label className="field-label">
          Nominal (Rp)
          <input
            className="field-control money"
            defaultValue={initialValue?.amount}
            inputMode="decimal"
            maxLength={15}
            name="amount"
            placeholder="Contoh: 50000"
            required
          />
        </label>
        <label className="field-label">
          Kategori
          <input
            className="field-control"
            defaultValue={initialValue?.category}
            maxLength={60}
            name="category"
            required
          />
        </label>
        <label className="field-label">
          Tanggal
          <input
            className="field-control"
            defaultValue={
              initialValue?.date ?? new Date().toISOString().slice(0, 10)
            }
            name="date"
            required
            type="date"
          />
        </label>
      </div>
      <label className="field-label">
        Catatan (opsional)
        <input
          className="field-control"
          defaultValue={initialValue?.note ?? ""}
          maxLength={240}
          name="note"
        />
      </label>
      <ActionFeedback state={state} />
      <button
        className="button-primary"
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
