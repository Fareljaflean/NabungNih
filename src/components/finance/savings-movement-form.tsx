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
    <form
      action={formAction}
      className={`border-t p-4 ${
        mode === "add"
          ? "border-emerald-700 bg-emerald-50/60"
          : "border-line bg-white"
      }`}
    >
      <input name="goalId" type="hidden" value={goalId} />
      <label className="field-label">
        {label} (Rp)
        <input
          className="field-control money"
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
          className={mode === "add" ? "button-primary" : "button-secondary"}
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Memproses..." : label}
        </button>
      </div>
    </form>
  );
}
