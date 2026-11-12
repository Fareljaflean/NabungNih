"use client";

import { useActionState, type FormEvent } from "react";
import { deleteTransaction } from "@/app/transactions/actions";
import { ActionFeedback } from "@/components/finance/action-feedback";
import { initialActionState } from "@/lib/action-state";

export function DeleteTransactionButton({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(
    deleteTransaction,
    initialActionState,
  );

  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm("Hapus transaksi ini?")) {
      event.preventDefault();
    }
  }

  return (
    <form action={formAction} onSubmit={confirmDelete}>
      <input name="id" type="hidden" value={id} />
      <ActionFeedback state={state} />
      <button
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Menghapus..." : "Hapus"}
      </button>
    </form>
  );
}
