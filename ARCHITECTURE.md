# BAGAIMANA SISTEM BEKERJA? (ARCHITECTURE.md: NabungNih)
ARCHITECTURE.md berisi struktur aplikasi, database, API & alur data, frontend vs backend, dan keamanan untuk project NabungNih.

## 1. System Overview
Gambaran sistem[cite: 10]:
- The application uses Next.js for the web interface and server-side application logic[cite: 10].
- PostgreSQL stores user, transaction, and savings goal data.
- Prisma provides database access[cite: 10].

## 2. Architecture
Pembagian frontend dan backend[cite: 10]:
- Frontend: Next.js App Router[cite: 10]
- Language: TypeScript[cite: 10]
- Styling: Tailwind CSS[cite: 10]
- Backend: Next.js Server Actions and Route Handlers[cite: 10]
- Database: PostgreSQL[cite: 10]
- ORM: Prisma[cite: 10]
- Authentication: Auth.js Credentials with JWT sessions
- Prisma 7 uses the PostgreSQL driver adapter; connection strings stay in server-side environment variables.

## 3. Request Flow
Alur data dari UI ke database[cite: 10]:
1. User interacts with the UI (e.g., adds a new transaction or savings goal)[cite: 10].
2. Input is validated on the server[cite: 10].
3. Authentication is verified[cite: 10].
4. Business rules are executed (e.g., calculating balance and savings progress)[cite: 10].
5. Prisma reads or writes data[cite: 10].
6. The UI displays the result[cite: 10].

## 4. Data Model
Entitas dan relasinya[cite: 10]:
### User
- id: string / uuid
- name, email, passwordHash
### Transaction
- id: string
- userId: owner reference[cite: 10]
- type: INCOME | EXPENSE
- amount: decimal
- category: string
- note: optional string
- date: timestamp
### SavingsGoal
- id: string
- userId: owner reference[cite: 10]
- targetName: string
- targetAmount: decimal
- currentAmount: decimal
- deadline: date
Relationship:
- One User has many Transactions and SavingsGoals.
- Each Transaction and SavingsGoal belongs to one User.

## 5. Authorization Rules
Siapa boleh mengakses apa[cite: 10]:
- A user can only read their own transactions and savings data[cite: 10].
- A user can only update their own financial records[cite: 10].
- A user can only delete their own data[cite: 10].
- Verify ownership on the server for every operation[cite: 10].
- Scope reads and mutations by the authenticated session user ID; never accept a user ID from a form.
- Never rely only on client-side checks[cite: 10].
- Store passwords as bcrypt hashes and keep session tokens in HTTP-only cookies managed by Auth.js.

## 6. Business Logic
Aturan bisnis aplikasi[cite: 10]:
- Transaction amount must be greater than zero.
- Monetary values use decimal precision with at most two fractional digits.
- Total balance = Sum of Incomes - Sum of Expenses.
- Savings progress is capped at 100%; contributions may exceed the goal, but withdrawals cannot exceed its current amount.
- Savings withdrawals use an atomic balance condition to prevent negative balances.
- Reject invalid input before database writes[cite: 10].

## 8. Security
Pengamanan data dan akses[cite: 10]:
- Keep database credentials server-side[cite: 10].
- Validate all untrusted input[cite: 10].
- Enforce authentication and authorization[cite: 10].

## 9. Migrations
Perubahan skema database[cite: 10]:
- Use Prisma migrations to manage schema changes[cite: 10].
- Do not modify production schema manually[cite: 10].
- Review migrations before applying them[cite: 10].
- Set `DATABASE_URL` in the ignored `.env` file, then run `npm run db:generate` to generate the Prisma Client.
- Review and approve a migration before running it; no migration is applied during initial setup.