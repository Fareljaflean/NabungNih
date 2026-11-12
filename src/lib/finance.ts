import { z } from "zod";

export const amountSchema = z
  .string()
  .trim()
  .max(15, "Nominal terlalu besar.")
  .regex(/^\d{1,12}(?:\.\d{1,2})?$/, "Gunakan nominal positif dengan maksimal 2 angka desimal.")
  .refine((amount) => /[1-9]/.test(amount), "Nominal harus lebih dari 0.");

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid.")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Tanggal tidak valid.")
  .transform((value) => new Date(`${value}T00:00:00.000Z`));

function toMinorUnits(amount: string): bigint {
  if (!/^\d+(?:\.\d{1,2})?$/.test(amount)) {
    throw new TypeError("Nominal harus berupa angka dengan maksimal 2 angka desimal.");
  }

  const [whole, fraction = ""] = amount.split(".");
  return BigInt(whole) * BigInt(100) + BigInt(fraction.padEnd(2, "0"));
}

export function calculateSavingsProgress(
  currentAmount: string,
  targetAmount: string,
): number {
  const current = toMinorUnits(currentAmount);
  const target = toMinorUnits(targetAmount);
  if (target <= BigInt(0)) {
    throw new RangeError("Nominal target harus lebih dari 0.");
  }
  if (current <= BigInt(0)) {
    return 0;
  }
  if (current >= target) {
    return 100;
  }

  return Number((current * BigInt(100)) / target);
}

export function formatCurrency(amount: string | number): string {
  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
