import Link from "next/link";
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

export function SavingsGoalCard({
  compact = false,
  goal,
}: {
  compact?: boolean;
  goal: SavingsGoalValue;
}) {
  const progress = calculateSavingsProgress(goal.currentAmount, goal.targetAmount);

  return (
    <article className={compact ? "py-4" : "finance-card"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">{goal.targetName}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tenggat {formatDate(new Date(`${goal.deadline}T00:00:00.000Z`))}
          </p>
        </div>
        <p className="money text-sm font-semibold text-emerald-800">{progress}%</p>
      </div>
      <div
        aria-label={`Progres ${goal.targetName}: ${progress}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-emerald-700 transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        <span className="money font-medium text-ink">{formatCurrency(goal.currentAmount)}</span>
        {" dari "}
        <span className="money">{formatCurrency(goal.targetAmount)}</span>
      </p>
      {compact ? (
        <Link
          className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"
          href="/savings"
        >
          Buka target
        </Link>
      ) : (
        <>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <SavingsMovementForm goalId={goal.id} mode="add" />
            <SavingsMovementForm goalId={goal.id} mode="withdraw" />
          </div>
          <details className="mt-4 border-t border-line pt-4">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800">
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
        </>
      )}
    </article>
  );
}
