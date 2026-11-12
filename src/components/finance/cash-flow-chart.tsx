import {
  cashFlowAmountToMinorUnits,
  type CashFlowDay,
} from "@/lib/dashboard";
import { formatCurrency } from "@/lib/finance";

const chartTop = 22;
const chartBaseline = 138;
const chartHeight = chartBaseline - chartTop;
const barWidth = 10;

export function CashFlowChart({ days }: { days: CashFlowDay[] }) {
  const maximumAmount = days.reduce(
    (maximum, day) => {
      const income = cashFlowAmountToMinorUnits(day.income);
      const expense = cashFlowAmountToMinorUnits(day.expense);
      const dayMaximum = income > expense ? income : expense;
      return dayMaximum > maximum ? dayMaximum : maximum;
    },
    0n,
  );
  const hasTransactions = maximumAmount > 0n;
  const chartDescription = hasTransactions
    ? days
        .map(
          (day) =>
            `${day.longLabel}: pemasukan ${formatCurrency(day.income)}, pengeluaran ${formatCurrency(day.expense)}`,
        )
        .join(". ")
    : "Belum ada transaksi dalam tujuh hari terakhir.";
  const barHeight = (amount: string) => {
    const value = cashFlowAmountToMinorUnits(amount);
    if (value === 0n || maximumAmount === 0n) {
      return 0;
    }

    return Math.max(
      2,
      Number((value * BigInt(chartHeight)) / maximumAmount),
    );
  };

  return (
    <section
      aria-labelledby="cash-flow-heading"
      className="finance-card flex min-w-0 flex-col"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            className="text-lg font-semibold tracking-tight text-ink md:text-xl"
            id="cash-flow-heading"
          >
            Arus kas
          </h2>
          <p className="mt-1 text-sm text-muted">Tujuh hari terakhir</p>
        </div>
        <div
          aria-label="Keterangan grafik"
          className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-sm text-muted"
          role="group"
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-sm bg-emerald-700"
            />
            Pemasukan
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-sm bg-red-700"
            />
            Pengeluaran
          </span>
        </div>
      </div>

      <svg
        aria-labelledby="cash-flow-chart-title cash-flow-chart-description"
        className="mt-5 h-[188px] w-full"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 360 188"
      >
        <title id="cash-flow-chart-title">
          Grafik pemasukan dan pengeluaran tujuh hari terakhir
        </title>
        <desc id="cash-flow-chart-description">{chartDescription}</desc>
        {[chartTop, (chartTop + chartBaseline) / 2, chartBaseline].map(
          (lineY) => (
            <line
              key={lineY}
              stroke="#dce4dd"
              strokeDasharray={lineY === chartBaseline ? undefined : "3 5"}
              strokeWidth="1"
              x1="8"
              x2="352"
              y1={lineY}
              y2={lineY}
            />
          ),
        )}
        {days.map((day, index) => {
          const center = 24 + index * 52;
          const incomeHeight = barHeight(day.income);
          const expenseHeight = barHeight(day.expense);

          return (
            <g key={day.date}>
              <rect
                fill="#08734f"
                height={incomeHeight}
                rx="3"
                width={barWidth}
                x={center - 12}
                y={chartBaseline - incomeHeight}
              >
                <title>
                  {day.longLabel}: pemasukan {formatCurrency(day.income)}
                </title>
              </rect>
              <rect
                fill="#b83232"
                height={expenseHeight}
                rx="3"
                width={barWidth}
                x={center + 2}
                y={chartBaseline - expenseHeight}
              >
                <title>
                  {day.longLabel}: pengeluaran {formatCurrency(day.expense)}
                </title>
              </rect>
              <text
                fill="#64736a"
                fontSize="13"
                textAnchor="middle"
                x={center}
                y="158"
              >
                {day.label}
              </text>
              <text
                fill="#64736a"
                fontSize="13"
                textAnchor="middle"
                x={center}
                y="174"
              >
                {day.dayNumber}
              </text>
            </g>
          );
        })}
        {!hasTransactions && (
          <text
            fill="#64736a"
            fontSize="12"
            textAnchor="middle"
            x="180"
            y="86"
          >
            Belum ada transaksi minggu ini
          </text>
        )}
      </svg>
    </section>
  );
}
