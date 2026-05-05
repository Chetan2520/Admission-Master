import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalChatbot from "@/components/GlobalChatbot";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Admission Master | Securing Your Academic Legacy",
  description: "India's Premiere Admission Protocol. Get matched with top-tier institutions and secure your seats today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} font-inter antialiased bg-white text-slate-900 min-h-screen flex flex-col`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
