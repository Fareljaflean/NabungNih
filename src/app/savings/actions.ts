"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState } from "@/lib/action-state";
import { amountSchema, dateSchema } from "@/lib/finance";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

const goalSchema = z.object({
  targetName: z.string().trim().min(1, "Nama target wajib diisi.").max(80, "Nama target maksimal 80 karakter."),
  targetAmount: amountSchema,
  deadline: dateSchema,
});

const movementSchema = z.object({
  goalId: z.string().trim().min(1).max(64),
  amount: amountSchema,
});

function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Periksa kembali data target tabungan.";
}

function revalidateSavings() {
  revalidatePath("/");
  revalidatePath("/savings");
}

export async function createSavingsGoal(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsedInput = goalSchema.safeParse({
    targetName: formData.get("targetName"),
    targetAmount: formData.get("targetAmount"),
    deadline: formData.get("deadline"),
  });
  if (!parsedInput.success) {
    return { error: firstIssueMessage(parsedInput.error) };
  }

  await prisma.savingsGoal.create({
    data: {
      ...parsedInput.data,
      targetAmount: new Prisma.Decimal(parsedInput.data.targetAmount),
      userId: user.id,
    },
    select: { id: true },
  });
  revalidateSavings();
  return { success: "Target tabungan berhasil dibuat." };
}

export async function updateSavingsGoal(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsedId = z.string().trim().min(1).max(64).safeParse(formData.get("id"));
  if (!parsedId.success) {
    return { error: "Target tabungan tidak ditemukan." };
  }

  const parsedInput = goalSchema.safeParse({
    targetName: formData.get("targetName"),
    targetAmount: formData.get("targetAmount"),
    deadline: formData.get("deadline"),
  });
  if (!parsedInput.success) {
    return { error: firstIssueMessage(parsedInput.error) };
  }

  const result = await prisma.savingsGoal.updateMany({
    where: { id: parsedId.data, userId: user.id },
    data: {
      ...parsedInput.data,
      targetAmount: new Prisma.Decimal(parsedInput.data.targetAmount),
    },
  });
  if (result.count === 0) {
    return { error: "Target tabungan tidak ditemukan." };
  }

  revalidateSavings();
  return { success: "Target tabungan berhasil diperbarui." };
}

async function applySavingsMovement(
  formData: FormData,
  direction: "add" | "withdraw",
): Promise<ActionState> {
  const user = await requireUser();
  const parsedInput = movementSchema.safeParse({
    goalId: formData.get("goalId"),
    amount: formData.get("amount"),
  });
  if (!parsedInput.success) {
    return { error: firstIssueMessage(parsedInput.error) };
  }

  const amount = new Prisma.Decimal(parsedInput.data.amount);
  const maximumBalance = new Prisma.Decimal("999999999999.99");
  const result =
    direction === "add"
      ? await prisma.savingsGoal.updateMany({
          where: {
            id: parsedInput.data.goalId,
            userId: user.id,
            currentAmount: { lte: maximumBalance.minus(amount) },
          },
          data: { currentAmount: { increment: amount } },
        })
      : await prisma.savingsGoal.updateMany({
          where: {
            id: parsedInput.data.goalId,
            userId: user.id,
            currentAmount: { gte: amount },
          },
          data: { currentAmount: { decrement: amount } },
        });

  if (result.count === 0) {
    const goalExists = await prisma.savingsGoal.findFirst({
      where: { id: parsedInput.data.goalId, userId: user.id },
      select: { id: true },
    });
    if (!goalExists) {
      return { error: "Target tabungan tidak ditemukan." };
    }
    if (direction === "add") {
      return { error: "Saldo target sudah mencapai batas maksimum." };
    }
    return { error: "Saldo target tidak cukup untuk penarikan tersebut." };
  }

  revalidateSavings();
  return {
    success:
      direction === "add"
        ? "Dana berhasil ditambahkan ke target."
        : "Dana berhasil ditarik dari target.",
  };
}

export async function addSavings(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return applySavingsMovement(formData, "add");
}

export async function withdrawSavings(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return applySavingsMovement(formData, "withdraw");
}
