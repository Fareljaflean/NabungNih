import Link from "next/link";
import type { ReactNode } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";

type AppShellProps = {
  activePage: "dashboard" | "transactions" | "savings";
  children: ReactNode;
  pageTitle: string;
  subtitle: string;
  userName: string;
};

const navigationItems = [
  { href: "/", id: "dashboard", label: "Dashboard" },
  { href: "/transactions", id: "transactions", label: "Transaksi" },
  { href: "/savings", id: "savings", label: "Target tabungan" },
] as const;

export function AppShell({
  activePage,
  children,
  pageTitle,
  subtitle,
  userName,
}: AppShellProps) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-gray-200 bg-white px-5 py-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-6">
        <Link
          aria-label="NabungNih, halaman utama"
          className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900"
          href="/"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white"
          >
            N
          </span>
          NabungNih
        </Link>
        <nav
          aria-label="Navigasi utama"
          className="mt-7 flex flex-wrap gap-2 md:flex-col"
        >
          {navigationItems.map((item) => (
            <Link
              aria-current={item.id === activePage ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                item.id === activePage
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{subtitle}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {pageTitle}
              </h1>
              <p className="mt-2 text-sm text-gray-500">Halo, {userName}.</p>
            </div>
            <SignOutButton />
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
