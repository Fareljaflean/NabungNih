import { AppShell } from "@/components/finance/app-shell";
import { SavingsGoalCard } from "@/components/finance/savings-goal-card";
import { SavingsGoalForm } from "@/components/finance/savings-goal-form";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

export default async function SavingsPage() {
  const user = await requireUser();
  const goals = await prisma.savingsGoal.findMany({
    where: { userId: user.id },
    orderBy: { deadline: "asc" },
  });

  return (
    <AppShell
      activePage="savings"
      pageTitle="Target tabungan"
      subtitle="Rencanakan tujuanmu"
      userName={user.name ?? user.email ?? "pengguna"}
    >
      <section
        aria-labelledby="create-goal-heading"
        className="finance-card"
      >
        <h2 className="mb-5 text-xl font-semibold tracking-tight text-ink" id="create-goal-heading">
          Buat target baru
        </h2>
        <SavingsGoalForm />
      </section>

      <section aria-labelledby="goals-heading" className="mt-10">
        <h2
          className="text-xl font-semibold tracking-tight text-ink"
          id="goals-heading"
        >
          Target tabunganmu
        </h2>
        {goals.length > 0 ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            {goals.map((goal) => (
              <SavingsGoalCard
                goal={{
                  id: goal.id,
                  targetName: goal.targetName,
                  targetAmount: goal.targetAmount.toString(),
                  currentAmount: goal.currentAmount.toString(),
                  deadline: goal.deadline.toISOString().slice(0, 10),
                }}
                key={goal.id}
              />
            ))}
          </div>
        ) : (
          <div className="finance-card mt-4">
            <p className="font-semibold text-ink">Belum ada target tabungan</p>
            <p className="mt-2 text-sm text-gray-500">
              Buat target di atas, lalu tambahkan dana untuk melihat progresnya.
            </p>
          </div>
        )}
      </section>
    </AppShell>
  );
}
