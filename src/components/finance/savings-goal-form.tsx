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
      <label className="block text-sm font-medium text-gray-700">
        Nama target
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
          defaultValue={initialValue?.targetName}
          maxLength={80}
          name="targetName"
          required
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700">
          Nominal target (Rp)
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
            defaultValue={initialValue?.targetAmount}
            inputMode="decimal"
            maxLength={15}
            name="targetAmount"
            placeholder="Contoh: 1000000"
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Tenggat
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
            defaultValue={initialValue?.deadline}
            name="deadline"
            required
            type="date"
          />
        </label>
      </div>
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
            : "Buat target"}
      </button>
    </form>
  );
}
