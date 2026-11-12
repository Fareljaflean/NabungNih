"use client";

import { useActionState } from "react";
import {
  createSavingsGoal,
  updateSavingsGoal,
} from "@/app/savings/actions";
import { ActionFeedback } from "@/components/finance/action-feedback";
import { initialActionState } from "@/lib/action-state";

export type SavingsGoalFormValue = {
  id: string;
  targetName: string;
  targetAmount: string;
  deadline: string;
};

export function SavingsGoalForm({
  initialValue,
}: {
  initialValue?: SavingsGoalFormValue;
}) {
  const action = initialValue ? updateSavingsGoal : createSavingsGoal;
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  return (
    <form action={formAction} className="space-y-4">
      {initialValue && <input name="id" type="hidden" value={initialValue.id} />}
      <label className="field-label">
        Nama target
        <input
          className="field-control"
          defaultValue={initialValue?.targetName}
          maxLength={80}
          name="targetName"
          required
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field-label">
          Nominal target (Rp)
          <input
            className="field-control money"
            defaultValue={initialValue?.targetAmount}
            inputMode="decimal"
            maxLength={15}
            name="targetAmount"
            placeholder="Contoh: 1000000"
            required
          />
        </label>
        <label className="field-label">
          Tenggat
          <input
            className="field-control"
            defaultValue={initialValue?.deadline}
            name="deadline"
            required
            type="date"
          />
        </label>
      </div>
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
            : "Buat target"}
      </button>
    </form>
  );
}
