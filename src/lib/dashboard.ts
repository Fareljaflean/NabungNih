export type CashFlowTransaction = {
  amount: string;
  date: Date;
  type: "INCOME" | "EXPENSE";
};

export type CashFlowDay = {
  date: string;
  dayNumber: string;
  expense: string;
  income: string;
  label: string;
  longLabel: string;
};

const weekdayFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "short",
  timeZone: "UTC",
});
const longDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  weekday: "long",
  timeZone: "UTC",
});

export function cashFlowAmountToMinorUnits(amount: string): bigint {
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(amount);
  if (!match || match[1] === undefined) {
    throw new TypeError("Nominal transaksi grafik tidak valid.");
  }

  return (
    BigInt(match[1]) * 100n +
    BigInt((match[2] ?? "").padEnd(2, "0"))
  );
}

function fromMinorUnits(amount: bigint): string {
  const whole = amount / 100n;
  const fraction = String(amount % 100n).padStart(2, "0");
  return `${whole}.${fraction}`;
}

export function getSevenDayWindow(now: Date): {
  endAt: Date;
  startAt: Date;
} {
  return {
    endAt: new Date(now),
    startAt: new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6),
    ),
  };
}

export function buildSevenDayCashFlow(
  transactions: CashFlowTransaction[],
  startAt: Date,
): CashFlowDay[] {
  const totals = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(
      Date.UTC(
        startAt.getUTCFullYear(),
        startAt.getUTCMonth(),
        startAt.getUTCDate() + index,
      ),
    );
    const dateKey = date.toISOString().slice(0, 10);

    return {
      date: dateKey,
      dayNumber: String(date.getUTCDate()),
      expense: 0n,
      income: 0n,
      label: weekdayFormatter.format(date).replace(/\./g, ""),
      longLabel: longDateFormatter.format(date),
    };
  });
  const totalsByDate = new Map(totals.map((day) => [day.date, day]));

  for (const transaction of transactions) {
    const day = totalsByDate.get(transaction.date.toISOString().slice(0, 10));
    if (!day) {
      continue;
    }

    const amount = cashFlowAmountToMinorUnits(transaction.amount);
    if (transaction.type === "INCOME") {
      day.income += amount;
    } else {
      day.expense += amount;
    }
  }

  return totals.map((day) => ({
    ...day,
    expense: fromMinorUnits(day.expense),
    income: fromMinorUnits(day.income),
  }));
}
