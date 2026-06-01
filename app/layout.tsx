import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "../context/QuizContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hondana — Latihan Soal TPA & TBI Seleksi Kerja",
  description: "Aplikasi latihan ujian TPA (Tes Potensi Akademik) dan TBI (Tes Bahasa Inggris / TOEFL) interaktif dengan analisis AI Groq untuk kelulusan BUMN, CPNS, dan seleksi kerja.",
  keywords: ["TPA", "TBI", "TOEFL ITP", "CPNS", "BUMN", "Seleksi Kerja", "Ujian", "Latihan Soal"],
  authors: [{ name: "Hondana Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col antialiased selection:bg-accent/20">
        <QuizProvider>
          <div className="w-full max-w-[720px] md:max-w-[960px] mx-auto min-h-dvh flex flex-col relative pb-24 md:pb-12">
            {children}
          </div>
        </QuizProvider>
      </body>
    </html>
  );
}
