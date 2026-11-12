"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
    >
      Keluar
    </button>
  );
}
