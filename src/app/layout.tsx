import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-numbers",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NabungNih | Catatan keuangan pribadi",
    template: "%s | NabungNih",
  },
  description: "Catat pemasukan dan pengeluaran, pantau saldo, serta kelola target tabungan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
