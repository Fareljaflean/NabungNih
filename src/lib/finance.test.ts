import { describe, expect, it } from "vitest";
import { amountSchema, calculateSavingsProgress } from "./finance";

describe("amountSchema", () => {
  it("accepts positive amounts with up to two decimals", () => {
    expect(amountSchema.safeParse("1250").success).toBe(true);
    expect(amountSchema.safeParse("12.34").success).toBe(true);
  });

  it("rejects zero, negative, over-precision, and over-range amounts", () => {
    expect(amountSchema.safeParse("0.00").success).toBe(false);
    expect(amountSchema.safeParse("-1").success).toBe(false);
    expect(amountSchema.safeParse("1.234").success).toBe(false);
    expect(amountSchema.safeParse("1000000000000").success).toBe(false);
  });
});

describe("calculateSavingsProgress", () => {
  it("calculates progress using exact minor units", () => {
    expect(calculateSavingsProgress("12.50", "25")).toBe(50);
    expect(calculateSavingsProgress("0", "25")).toBe(0);
  });

  it("caps progress at 100 when savings exceed the target", () => {
    expect(calculateSavingsProgress("30", "25")).toBe(100);
  });
});
