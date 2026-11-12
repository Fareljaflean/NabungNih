# SEPERTI APA TAMPILANNYA? (DESIGN.md: NabungNih)
DESIGN.md berisi color palette, typography, spacing & layout, komponen UI, dan responsive design untuk aplikasi NabungNih.

## 1. Design Direction
Create a clean, trustworthy, and finance-focused interface.
Avoid unnecessary decoration and visual clutter so users can focus on tracking their balance, cash flow, and savings goals clearly.

## 2. Color Palette
- Primary (Emerald Green — Melambangkan pertumbuhan tabungan & pemasukan): #10B981
- Background: #F9FAFB
- Surface (Card / Modal): #FFFFFF
- Text Primary: #111827
- Text Secondary: #6B7280
- Border: #E5E7EB
- Danger (Pengeluaran / Hapus): #DC2626
- Warning (Target mendekati deadline): #F59E0B

## 3. Typography
- Font: Inter (atau Plus Jakarta Sans untuk angka nominal)
- Page heading: 28–32px
- Nominal / Balance highlight: 32–40px (Bold, tabular-nums agar angka sejajar)
- Section heading: 20–24px
- Body: 14–16px
- Caption / Tanggal transaksi: 12–13px

## 4. Layout
- Desktop: sidebar + main content (ringkasan saldo di atas, daftar transaksi & target tabungan di bawah).
- Mobile: bottom navigation bar atau collapsible menu untuk akses cepat pencatatan.
- Main content should have consistent spacing (gap 16px–24px).
- Avoid horizontal overflow on mobile.

## 5. Components
### Buttons
- Primary: filled primary color (#10B981) untuk aksi utama seperti "+ Catat Transaksi" atau "+ Tambah Target".
- Secondary: neutral background or outline untuk filter atau batal.
- Destructive: danger color (#DC2626) untuk menghapus catatan transaksi.
- Include hover, focus, and disabled states.
### Cards & Badges
- Balance Card: menampilkan total saldo bersih, total pemasukan, dan total pengeluaran.
- Progress Bar: indikator visual persentase pencapaian target tabungan.

## 6. Spacing & Elevation
- Base spacing unit: 4px / 8px (Tailwind scale).
- Card padding: 16px (mobile) dan 24px (desktop).
- Border radius: 12px (rounded-xl) untuk card, 8px (rounded-lg) untuk input & tombol.
- Subtle shadow (`shadow-sm`) dengan border tipis `#E5E7EB` sebagai pemisah antar elemen.

## 7. States
- Loading state (skeleton loader pada kartu saldo dan daftar transaksi).
- Empty state (ilustrasi & ajakan mencatat transaksi pertama atau membuat target tabungan baru saat data masih kosong).
- Error state (validasi jika nominal bernilai 0/negatif atau form wajib kosong).
- Success feedback (toast notification saat transaksi atau tabungan berhasil disimpan).

## 8. Responsive Design
- Mobile: single-column layout dengan tombol aksi cepat (Floating Action Button) untuk catat transaksi.
- Tablet: adapt navigation and spacing (grid 2 kolom untuk kartu ringkasan).
- Desktop: use the available space efficiently (sidebar kiri + grid dashboard multi-kolom).

## 9. Accessibility
- Maintain readable contrast (terutama pada angka nominal hijau dan merah).
- Support keyboard navigation.
- Use semantic HTML (`<main>`, `<nav>`, `<section>`, `<button>`).
- Provide visible focus indicators.