"use client";

import { useActionState } from "react";
import { registerUser, type RegistrationState } from "@/app/register/actions";

const initialState: RegistrationState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Nama
        <input
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
          maxLength={80}
          name="name"
          required
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Email
        <input
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
          maxLength={254}
          name="email"
          required
          type="email"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Password
        <input
          autoComplete="new-password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
          minLength={12}
          name="password"
          required
          type="password"
        />
        <span className="mt-1 block text-xs font-normal text-gray-500">
          Minimal 12 karakter.
        </span>
      </label>
      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <button
        className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Membuat akun..." : "Daftar"}
      </button>
    </form>
  );
}
