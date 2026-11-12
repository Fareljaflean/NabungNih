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
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
      >
        <h2 className="mb-5 text-lg font-semibold text-gray-900" id="create-goal-heading">
          Buat target baru
        </h2>
        <SavingsGoalForm />
      </section>

      <section aria-labelledby="goals-heading" className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900" id="goals-heading">
          Target tabunganmu
        </h2>
        {goals.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
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
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="font-medium text-gray-900">Belum ada target tabungan</p>
            <p className="mt-2 text-sm text-gray-500">
              Buat target di atas, lalu tambahkan dana untuk melihat progresnya.
            </p>
          </div>
        )}
      </section>
    </AppShell>
  );
}
