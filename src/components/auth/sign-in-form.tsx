"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password tidak sesuai.");
        setIsSubmitting(false);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Tidak dapat menghubungi server. Coba lagi.");
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
      <label className="field-label">
        Email
        <input
          autoComplete="email"
          className="field-control"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="field-label">
        Password
        <input
          autoComplete="current-password"
          className="field-control"
          name="password"
          required
          type="password"
        />
      </label>
      {error && (
        <p className="action-feedback-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button-primary w-full"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
