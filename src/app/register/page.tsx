import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <Link className="text-xl font-bold tracking-tight text-gray-900" href="/">
          NabungNih
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">Buat akun</h1>
        <p className="mt-2 text-sm text-gray-500">
          Mulai atur pemasukan, pengeluaran, dan tabunganmu.
        </p>
        <RegisterForm />
        <p className="mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/login">
            Masuk
          </Link>
        </p>
      </section>
    </main>
  );
}
