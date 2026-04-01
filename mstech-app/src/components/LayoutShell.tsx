"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTracker from "@/components/PageTracker";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <PageTracker />
      {!isAdmin && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
