"use client";

import { useActionState } from "react";
import { registerUser, type RegistrationState } from "@/app/register/actions";

const initialState: RegistrationState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} className="mt-7 space-y-5">
      <label className="field-label">
        Nama
        <input
          autoComplete="name"
          className="field-control"
          maxLength={80}
          name="name"
          required
        />
      </label>
      <label className="field-label">
        Email
        <input
          autoComplete="email"
          className="field-control"
          maxLength={254}
          name="email"
          required
          type="email"
        />
      </label>
      <label className="field-label">
        Password
        <input
          autoComplete="new-password"
          className="field-control"
          minLength={12}
          name="password"
          required
          type="password"
        />
        <span className="mt-2 block text-sm font-normal text-muted">
          Minimal 12 karakter.
        </span>
      </label>
      {state.error && (
        <p className="action-feedback-error" role="alert">
          {state.error}
        </p>
      )}
      <button
        className="button-primary w-full"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Membuat akun..." : "Daftar"}
      </button>
    </form>
  );
}
