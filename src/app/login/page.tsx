import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <Link className="text-xl font-bold tracking-tight text-gray-900" href="/">
          NabungNih
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">Masuk ke akunmu</h1>
        <p className="mt-2 text-sm text-gray-500">
          Lanjutkan mencatat dan memantau keuanganmu.
        </p>
        {registered === "1" && (
          <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
            Akun berhasil dibuat. Silakan masuk.
          </p>
        )}
        <SignInForm />
        <p className="mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/register">
            Daftar
          </Link>
        </p>
      </section>
    </main>
  );
}
