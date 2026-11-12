import { SavingsGoalForm } from "@/components/finance/savings-goal-form";
import { SavingsMovementForm } from "@/components/finance/savings-movement-form";
import { formatCurrency, formatDate, calculateSavingsProgress } from "@/lib/finance";

export type SavingsGoalValue = {
  id: string;
  targetName: string;
  targetAmount: string;
  currentAmount: string;
  deadline: string;
};

export function SavingsGoalCard({ goal }: { goal: SavingsGoalValue }) {
  const progress = calculateSavingsProgress(goal.currentAmount, goal.targetAmount);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{goal.targetName}</h2>
          <p className="mt-1 text-sm text-gray-500">
            Tenggat {formatDate(new Date(`${goal.deadline}T00:00:00.000Z`))}
          </p>
        </div>
        <p className="text-sm font-semibold text-emerald-700">{progress}%</p>
      </div>
      <div
        aria-label={`Progres ${goal.targetName}: ${progress}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        {formatCurrency(goal.currentAmount)} dari {formatCurrency(goal.targetAmount)}
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <SavingsMovementForm goalId={goal.id} mode="add" />
        <SavingsMovementForm goalId={goal.id} mode="withdraw" />
      </div>
      <details className="mt-4 border-t border-gray-100 pt-4">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
          Ubah target
        </summary>
        <div className="mt-4">
          <SavingsGoalForm
            initialValue={{
              id: goal.id,
              targetName: goal.targetName,
              targetAmount: goal.targetAmount,
              deadline: goal.deadline,
            }}
          />
        </div>
      </details>
    </article>
  );
}
