import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: '#5f63f2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Hondana — Latihan Soal TPA & TBI Seleksi Kerja",
  description: "Aplikasi latihan ujian TPA (Tes Potensi Akademik) dan TBI (Tes Bahasa Inggris / TOEFL) interaktif dengan analisis AI Groq untuk kelulusan BUMN, CPNS, dan seleksi kerja.",
  keywords: ["TPA", "TBI", "TOEFL ITP", "CPNS", "BUMN", "Seleksi Kerja", "Ujian", "Latihan Soal"],
  authors: [{ name: "Hondana Team" }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hondana',
  },
  icons: {
    apple: '/icon-192.png',
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
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
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col antialiased selection:bg-accent/20"
        suppressHydrationWarning
      >
        <QuizProvider>
          <div className="w-full min-h-dvh flex flex-col relative">
            {children}
          </div>
        </QuizProvider>
      </body>
    </html>
  );
}
