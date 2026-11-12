# SEPERTI APA TAMPILANNYA? (DESIGN.md: NabungNih)
Panduan visual NabungNih: aplikasi pencatatan keuangan pribadi yang mengutamakan keterbacaan saldo, transaksi, dan progres tabungan.

## 1. Design Direction
- Arah visual: **Buku Kas Editorial** — halaman terasa seperti catatan keuangan yang tertata, bukan kumpulan kartu dashboard generik atau landing page.
- Gunakan hierarki jelas: saldo bersih, arus masuk/keluar, lalu ledger transaksi dan target.
- Utamakan permukaan terang, tinta hijau tua, garis pemisah tipis, dan aksen emerald secukupnya.
- Jangan menampilkan angka, grafik, ulasan, atau aktivitas contoh seolah-olah data pengguna.

## 2. Color Palette
- Paper / background: `#F5F7F3`
- Surface: `#FFFFFF`
- Primary text / ink: `#17271F`
- Secondary text: `#64736A`
- Border / divider: `#DCE4DD`
- Primary action: `#08734F`
- Primary action hover: `#075C40`
- Positive amount: `#08734F`
- Expense / destructive: `#B83232`
- Warning: `#8A5700`
- Reserve saturated colors for actions and financial states; do not color every card.

## 3. Typography
- Interface: Plus Jakarta Sans.
- Monetary values: JetBrains Mono with tabular lining numerals.
- Page heading: 30–40px, semibold, tight tracking.
- Balance: 40–60px, semibold, tabular figures; allow long values to wrap on narrow screens.
- Section heading: 20–24px.
- Body and form labels: at least 14–16px with readable contrast.
- Dates and secondary metadata: 14px or larger.

## 4. Layout
- Desktop: persistent left navigation and a wide main column; balance leads the dashboard, followed by transaction ledger and compact savings progress.
- Dashboard: show the balance beside a seven-day cash-flow chart on wide screens, then place recent transactions and savings goals in separate panels; stack these panels on narrow screens.
- Mobile: compact top identity bar, fixed bottom navigation, and a quick transaction action on the dashboard.
- Transactions use open rows and dividers instead of a separate card for every record.
- Savings goals may use individual cards when their contribution and withdrawal controls are present.
- Savings progress is shown as a simple bar with current amount, target, and deadline.
- Keep consistent 16–24px spacing and prevent horizontal overflow.

## 5. Components
### Buttons and forms
- Primary actions use the dark emerald token and white text; maintain visible hover, focus, pending, and disabled states.
- Secondary actions use a neutral outline. Destructive actions use the danger token.
- Inputs are at least 48px tall with visible labels and keyboard focus.
- Preserve inline validation and success/error feedback for existing server actions.
### Finance displays
- Balance overview distinguishes net balance from income and expenses without repeating card chrome.
- Transaction rows show type, category, amount, date, and optional note.
- Savings goals show progress capped at 100%, current amount, target amount, and deadline.

## 6. Spacing & Elevation
- Use Tailwind's 4px/8px spacing rhythm.
- Prefer whitespace and dividers to nested panels, heavy borders, or repeated shadows.
- Keep controls and navigation targets at least 44px tall.
- Use restrained corner radii on controls; avoid applying the same rounded-card treatment to every section.

## 7. States
- Empty states explain the next available action without fabricated sample data.
- Validation rejects zero/negative amounts and missing required fields.
- Keep pending, error, and success feedback visible and accessible.
- Loading states should preserve layout and avoid shifting the balance or transaction list.

## 8. Responsive Design
- Mobile: single-column content, bottom navigation, quick action, and full-width form controls.
- Tablet: let content reflow naturally; keep balance figures and actions from colliding.
- Desktop: use the left navigation and a two-column dashboard only where each column has enough room.
- Test at 320px, 390px, tablet, and desktop widths.

## 9. Accessibility
- Maintain readable contrast for green income and red expense values.
- Support keyboard navigation and visible focus indicators.
- Use semantic `<main>`, `<nav>`, `<section>`, `<form>`, and `<button>` elements.
- Give icon-only actions an accessible name and progress indicators an accessible value.