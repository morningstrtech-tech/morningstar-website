"use client";

export const dynamic = "force-dynamic";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useRouter } from "next/navigation";
import { Loader2, Menu, X } from "lucide-react";
import { useSession } from "../../../lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (error || !session) {
        router.replace("/admin");
      } else if ((session.user as any).role !== "admin") {
        // Logged in but not an admin
        router.replace("/admin");
      }
    }
  }, [session, isPending, error, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050507" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-white/40 animate-spin" />
          <span className="text-xs text-white/30">Memverifikasi hak akses...</span>
        </div>
      </div>
    );
  }

  if (error || !session || (session.user as any).role !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen relative" style={{ background: "#050507" }}>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-20 z-[60] flex items-center justify-between px-6 bg-[#050507]/80 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-1.5">
            <Image 
              src="/logo.webp" 
              alt="MS.tech Logo" 
              width={32} 
              height={32} 
              className="w-full h-full object-contain brightness-0 invert opacity-80"
            />
          </div>
          <span className="text-sm font-black text-white tracking-widest uppercase">MS.tech</span>
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 text-white/60 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      <AdminSidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div 
        className="flex-1 transition-all duration-500 ease-in-out"
        style={{ 
          marginLeft: sidebarCollapsed ? "var(--sidebar-w-collapsed, 80px)" : "var(--sidebar-w, 240px)" 
        }}
      >
        <main className="p-4 pt-24 lg:p-10 lg:pt-10 transition-all duration-300">
          {children}
        </main>
      </div>

      <style jsx global>{`
        :root {
          --sidebar-w: 240px;
          --sidebar-w-collapsed: 80px;
        }
        @media (max-width: 1023px) {
          :root {
            --sidebar-w: 0px;
            --sidebar-w-collapsed: 0px;
          }
        }
      `}</style>
    </div>
  );
}
