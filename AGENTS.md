# BAGAIMANA AI HARUS BEKERJA? (AGENTS.md: NabungNih)
AGENTS.md berisi coding conventions, struktur folder, tech stack, aturan testing, dan batasan perubahan kode untuk pengembangan project NabungNih.

## 1. Project Overview
Dokumen yang wajib dibaca agent sebelum menulis kode.
This project is a personal finance and savings tracking web application (NabungNih). 
Read these documents before implementation:
- PRD.md
- DESIGN.md
- ARCHITECTURE.md

## 2. Tech Stack
Teknologi yang dipakai:
- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL (atau Supabase/Firebase sesuai konfigurasi Anda)
- Prisma ORM

## 3. Coding Rules
Konvensi penulisan kode:
- Use TypeScript for application code.
- Avoid using `any` unless absolutely necessary.
- Keep components small and reusable (pisahkan komponen UI transaksi, kartu saldo, dan form).
- Separate business logic from UI components.
- Use descriptive variable and function names.
- Follow existing project conventions.

## 4. Project Structure
Letak file di repo:
- `src/app/`: routes and pages (dashboard, transactions, savings)
- `src/components/`: reusable UI components (cards, buttons, modals)
- `src/lib/`: shared utilities and configuration (formatters for currency, helpers)
- `src/server/`: server-side business logic and API routes
- `prisma/`: database schema and migrations

## 5. Database Rules
Aturan akses data:
- Use Prisma for database access.
- Validate input before writing to the database (pastikan nominal transaksi valid/tidak negatif).
- Enforce user ownership for financial data (pastikan pengguna hanya bisa mengakses data keuangannya sendiri).
- Never expose database credentials to the client.

## 7. Testing Rules
Cara memastikan perubahan benar:
- Run lint and type checks after changes.
- Add tests for important business logic (kalkulasi total saldo dan target tabungan).
- Test authentication and data ownership.
- Never claim tests passed unless they were executed.

## 8. Workflow
Urutan kerja sebelum mengubah kode:
1. Understand the requirements.
2. Inspect relevant existing code.
3. Identify affected files.
4. Propose a plan for complex changes.
5. Implement the smallest complete solution.
6. Run relevant checks.
7. Summarize changes and test results.

## 9. Restrictions
Batasan perubahan kode:
- Do not introduce dependencies without a clear reason.
- Do not modify unrelated features.
- Do not hardcode secrets (gunakan env variables untuk koneksi database).
- Ask for clarification if requirements conflict.