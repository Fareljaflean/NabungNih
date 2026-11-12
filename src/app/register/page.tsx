import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="auth-shell min-h-screen lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <h1 className="sr-only">Buat akun</h1>
      <section className="hidden flex-col justify-between px-12 py-10 lg:flex xl:px-20 xl:py-14">
        <Link
          aria-label="NabungNih, halaman utama"
          className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-ink"
          href="/"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm text-white">
            N
          </span>
          NabungNih
        </Link>
        <div className="max-w-xl pb-10">
          <p className="mb-5 text-sm font-semibold text-emerald-800">
            Catatan keuangan pribadi
          </p>
          <h2 className="text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-ink xl:text-6xl">
            Mulai catat keuanganmu.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            Catat transaksi, lihat saldo, lalu pantau target tabungan di satu tempat.
          </p>
          <div className="mt-12 max-w-md divide-y divide-line border-y border-line">
            <p className="py-4 text-sm font-medium text-ink">
              <span className="mr-4 font-normal text-muted">01</span>
              Catat uang masuk dan keluar
            </p>
            <p className="py-4 text-sm font-medium text-ink">
              <span className="mr-4 font-normal text-muted">02</span>
              Pantau saldo terkini
            </p>
            <p className="py-4 text-sm font-medium text-ink">
              <span className="mr-4 font-normal text-muted">03</span>
              Buat target tabungan
            </p>
          </div>
        </div>
        <p className="text-sm text-muted">Satu akun untuk catatan keuanganmu.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 lg:px-10">
        <div className="w-full max-w-md">
          <Link
            aria-label="NabungNih, halaman utama"
            className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-ink lg:hidden"
            href="/"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm text-white">
              N
            </span>
            NabungNih
          </Link>
          <p className="mt-10 text-sm font-semibold text-emerald-800 lg:mt-0">
            Akun baru
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Buat akun
          </h2>
          <p className="mt-2 text-base leading-7 text-muted">
            Masukkan nama, email, dan password untuk mendaftar.
          </p>
          <RegisterForm />
          <p className="mt-7 border-t border-line pt-5 text-sm text-muted">
            Sudah punya akun?{" "}
            <Link
              className="font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"
              href="/login"
            >
              Masuk
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
