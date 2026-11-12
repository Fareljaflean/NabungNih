import { describe, expect, it } from "vitest";
import {
  buildSevenDayCashFlow,
  getSevenDayWindow,
  type CashFlowTransaction,
} from "./dashboard";

describe("getSevenDayWindow", () => {
  it("includes today and the six preceding UTC calendar days", () => {
    const window = getSevenDayWindow(new Date("2026-11-12T08:30:00.000Z"));

    expect(window.startAt.toISOString()).toBe("2026-11-06T00:00:00.000Z");
    expect(window.endAt.toISOString()).toBe("2026-11-12T08:30:00.000Z");
  });
});

describe("buildSevenDayCashFlow", () => {
  it("aggregates income and expenses by day without losing cents", () => {
    const transactions: CashFlowTransaction[] = [
      {
        amount: "1250.45",
        date: new Date("2026-11-06T03:00:00.000Z"),
        type: "INCOME",
      },
      {
        amount: "10.10",
        date: new Date("2026-11-06T15:00:00.000Z"),
        type: "INCOME",
      },
      {
        amount: "0.5",
        date: new Date("2026-11-06T16:00:00.000Z"),
        type: "INCOME",
      },
      {
        amount: "25.05",
        date: new Date("2026-11-06T18:00:00.000Z"),
        type: "EXPENSE",
      },
      {
        amount: "99",
        date: new Date("2026-11-05T23:59:59.000Z"),
        type: "EXPENSE",
      },
    ];

    const days = buildSevenDayCashFlow(
      transactions,
      new Date("2026-11-06T00:00:00.000Z"),
    );

    expect(days).toHaveLength(7);
    expect(days[0]).toMatchObject({
      date: "2026-11-06",
      income: "1261.05",
      expense: "25.05",
    });
    expect(days[1]).toMatchObject({
      date: "2026-11-07",
      income: "0.00",
      expense: "0.00",
    });
  });

  it("rejects malformed transaction amounts instead of hiding them", () => {
    expect(() =>
      buildSevenDayCashFlow(
        [
          {
            amount: "-1",
            date: new Date("2026-11-06T12:00:00.000Z"),
            type: "EXPENSE",
          },
        ],
        new Date("2026-11-06T00:00:00.000Z"),
      ),
    ).toThrow("Nominal transaksi grafik tidak valid.");
  });
});
