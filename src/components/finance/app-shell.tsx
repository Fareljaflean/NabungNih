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
  { href: "/", id: "dashboard", label: "Ringkasan" },
  { href: "/transactions", id: "transactions", label: "Transaksi" },
  { href: "/savings", id: "savings", label: "Tabungan" },
] as const;

function NavigationLinks({
  activePage,
  mobile = false,
}: {
  activePage: AppShellProps["activePage"];
  mobile?: boolean;
}) {
  return (
    <nav
      aria-label="Navigasi utama"
      className={
        mobile
          ? "grid grid-cols-3 gap-1"
          : "mt-10 flex flex-col gap-1"
      }
    >
      {navigationItems.map((item) => (
        <Link
          aria-current={item.id === activePage ? "page" : undefined}
          className={
            mobile
              ? `flex min-h-14 items-center justify-center px-2 text-center text-xs font-semibold ${
                  item.id === activePage
                    ? "border-t-2 border-emerald-700 text-emerald-800"
                    : "border-t-2 border-transparent text-gray-500"
                }`
              : "nav-link"
          }
          href={item.href}
          key={item.id}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({
  activePage,
  children,
  pageTitle,
  subtitle,
  userName,
}: AppShellProps) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="relative flex items-center justify-between border-b border-line bg-white px-5 py-3 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:flex-col md:items-stretch md:justify-start md:border-b-0 md:border-r md:px-6 md:py-7">
        <Link
          aria-label="NabungNih, halaman utama"
          className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-ink"
          href="/"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white"
          >
            N
          </span>
          NabungNih
        </Link>
        <div className="hidden md:block">
          <NavigationLinks activePage={activePage} />
        </div>
        <div className="mt-auto hidden border-t border-line pt-5 md:block">
          <p className="mb-3 truncate text-sm font-medium text-ink">{userName}</p>
          <SignOutButton />
        </div>
        <div className="md:hidden">
          <SignOutButton />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 pb-28 pt-8 md:px-10 md:pb-10 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-6 md:mb-10 md:pb-7">
            <div>
              <p className="text-sm font-medium text-muted">{subtitle}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {pageTitle}
              </h1>
              <p className="mt-2 text-sm text-muted md:hidden">
                Halo, {userName}.
              </p>
            </div>
            {activePage === "dashboard" && (
              <Link
                className="button-primary hidden sm:inline-flex"
                href="/transactions#new-transaction"
              >
                Catat transaksi
              </Link>
            )}
          </header>
          {children}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <NavigationLinks activePage={activePage} mobile />
      </div>
      {activePage === "dashboard" && (
        <Link
          aria-label="Catat transaksi"
          className="button-primary fixed bottom-[4.75rem] right-5 z-20 h-14 w-14 rounded-full p-0 text-2xl shadow-lg sm:hidden"
          href="/transactions#new-transaction"
        >
          <span aria-hidden="true">+</span>
        </Link>
      )}
    </div>
  );
}
