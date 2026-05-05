"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalChatbot from "@/components/GlobalChatbot";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Paths where Navbar and Footer should be HIDDEN
  const hideLayoutPaths = [
    "/admin",
    "/counsellor",
    "/dashboard",
    "/login",
    "/register"
  ];

  const shouldHideLayout = hideLayoutPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!shouldHideLayout && <Footer />}
      {!shouldHideLayout && <GlobalChatbot />}
    </>
  );
}
