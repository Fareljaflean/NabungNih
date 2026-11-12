"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionState } from "@/lib/action-state";
import { amountSchema, dateSchema } from "@/lib/finance";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: amountSchema,
  category: z.string().trim().min(1, "Kategori wajib diisi.").max(60, "Kategori maksimal 60 karakter."),
  note: z.string().trim().max(240, "Catatan maksimal 240 karakter.").transform((note) => note || null),
  date: dateSchema,
});

const transactionIdSchema = z.string().trim().min(1).max(64);

function getTransactionInput(formData: FormData) {
  return transactionSchema.safeParse({
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    note: formData.get("note") ?? "",
    date: formData.get("date"),
  });
}

function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Periksa kembali data transaksi.";
}

function revalidateTransactions() {
  revalidatePath("/");
  revalidatePath("/transactions");
}

export async function createTransaction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsedInput = getTransactionInput(formData);
  if (!parsedInput.success) {
    return { error: firstIssueMessage(parsedInput.error) };
  }

  await prisma.transaction.create({
    data: {
      ...parsedInput.data,
      amount: new Prisma.Decimal(parsedInput.data.amount),
      userId: user.id,
    },
    select: { id: true },
  });
  revalidateTransactions();
  return { success: "Transaksi berhasil disimpan." };
}

export async function updateTransaction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsedId = transactionIdSchema.safeParse(formData.get("id"));
  if (!parsedId.success) {
    return { error: "Transaksi tidak ditemukan." };
  }

  const parsedInput = getTransactionInput(formData);
  if (!parsedInput.success) {
    return { error: firstIssueMessage(parsedInput.error) };
  }

  const result = await prisma.transaction.updateMany({
    where: { id: parsedId.data, userId: user.id },
    data: {
      ...parsedInput.data,
      amount: new Prisma.Decimal(parsedInput.data.amount),
    },
  });
  if (result.count === 0) {
    return { error: "Transaksi tidak ditemukan." };
  }

  revalidateTransactions();
  return { success: "Transaksi berhasil diperbarui." };
}

export async function deleteTransaction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsedId = transactionIdSchema.safeParse(formData.get("id"));
  if (!parsedId.success) {
    return { error: "Transaksi tidak ditemukan." };
  }

  const result = await prisma.transaction.deleteMany({
    where: { id: parsedId.data, userId: user.id },
  });
  if (result.count === 0) {
    return { error: "Transaksi tidak ditemukan." };
  }

  revalidateTransactions();
  return { success: "Transaksi berhasil dihapus." };
}
