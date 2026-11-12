"use client";

import { useActionState } from "react";
import { addSavings, withdrawSavings } from "@/app/savings/actions";
import { ActionFeedback } from "@/components/finance/action-feedback";
import { initialActionState } from "@/lib/action-state";

export function SavingsMovementForm({
  goalId,
  mode,
}: {
  goalId: string;
  mode: "add" | "withdraw";
}) {
  const action = mode === "add" ? addSavings : withdrawSavings;
  const [state, formAction, isPending] = useActionState(action, initialActionState);
  const label = mode === "add" ? "Tambah dana" : "Tarik dana";

  return (
    <form action={formAction} className="rounded-lg bg-gray-50 p-4">
      <input name="goalId" type="hidden" value={goalId} />
      <label className="block text-sm font-medium text-gray-700">
        {label} (Rp)
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900"
          inputMode="decimal"
          maxLength={15}
          name="amount"
          placeholder="Nominal"
          required
        />
      </label>
      <div className="mt-3 space-y-2">
        <ActionFeedback state={state} />
        <button
          className={`rounded-lg px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${
            mode === "add"
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Memproses..." : label}
        </button>
      </div>
    </form>
  );
}
