import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/footer/Footer";
import { Layout } from "@/components/layout/Layout";
import { Navbar } from "@/components/navbar/Navbar";
import { PageTransition } from "@/components/motion/PageTransition";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevForge — Production-ready code blocks",
    template: "%s — DevForge",
  },
  description:
    "DevForge provides production-ready reusable backend and frontend code blocks for developers.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.98 0.01 260)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.13 0.04 260)" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <PageTransition>
            <Layout>{children}</Layout>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
