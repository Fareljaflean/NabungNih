import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;

  return (
    <main className="auth-shell min-h-screen lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <h1 className="sr-only">Masuk ke akunmu</h1>
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
            Uang masuk dan keluar, tercatat rapi.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            Lihat saldo dari transaksi dan ikuti progres target tabunganmu.
          </p>
          <div className="mt-12 max-w-md divide-y divide-line border-y border-line">
            <p className="py-4 text-sm font-medium text-ink">
              <span className="mr-4 font-normal text-muted">01</span>
              Pemasukan dan pengeluaran
            </p>
            <p className="py-4 text-sm font-medium text-ink">
              <span className="mr-4 font-normal text-muted">02</span>
              Ringkasan saldo
            </p>
            <p className="py-4 text-sm font-medium text-ink">
              <span className="mr-4 font-normal text-muted">03</span>
              Target tabungan
            </p>
          </div>
        </div>
        <p className="text-sm text-muted">Data keuangan hanya terlihat di akunmu.</p>
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
            Selamat datang kembali
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Masuk ke akunmu
          </h2>
          <p className="mt-2 text-base leading-7 text-muted">
            Gunakan email dan password yang terdaftar.
          </p>
          {registered === "1" && (
            <p className="action-feedback-success mt-6" role="status">
              Akun berhasil dibuat. Silakan masuk.
            </p>
          )}
          <SignInForm />
          <p className="mt-7 border-t border-line pt-5 text-sm text-muted">
            Belum punya akun?{" "}
            <Link
              className="font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"
              href="/register"
            >
              Daftar
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
