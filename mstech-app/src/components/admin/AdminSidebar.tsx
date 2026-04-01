"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, MessageSquare, FolderKanban, Package,
  LogOut, ChevronLeft, ChevronRight, ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/dashboard/services", label: "Services", icon: Package },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function AdminSidebar({ mobileOpen, onMobileClose, collapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed:", err);
      // Fallback redirect
      router.push("/admin");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden transition-opacity duration-300"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen z-[80] flex flex-col transition-all duration-500 ease-in-out shadow-2xl lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: collapsed ? 80 : 240,
          background: "rgba(5,5,7,0.95)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          backdropFilter: "blur(40px)",
        }}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 h-16 lg:h-20 border-b border-white/5">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3 group transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden p-1.5">
                <Image 
                  src="/logo.webp" 
                  alt="MS.tech Logo" 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-contain brightness-0 invert opacity-80"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-widest uppercase">MS.tech</span>
                <span className="text-[9px] text-white/30 font-bold tracking-tight uppercase">Admin Console</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto overflow-hidden p-1.5">
              <Image 
                src="/logo.webp" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-contain brightness-0 invert opacity-80"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          {!collapsed && (
            <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          )}
          
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024 && onMobileClose) onMobileClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative group ${
                  active 
                  ? "text-white bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className={`transition-colors duration-300 ${active ? "text-indigo-400" : "text-current"}`} />
                {!collapsed && <span>{item.label}</span>}
                
                {/* Active Indicator Line */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                )}
              </Link>
            );
          })}

          <div className="pt-6 mt-4 border-t border-white/5">
            {!collapsed && (
              <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">External</p>
            )}
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/40 hover:text-white/80 hover:bg-white/[0.02] transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {!collapsed && <span>Back to Site</span>}
            </Link>
          </div>
        </nav>

        {/* Branding / Collapse Toggle */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-red-400/50 hover:text-red-400 hover:bg-red-500/5 transition-all group mb-4"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            {!collapsed && <span>Sign Out</span>}
          </button>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-full py-2 rounded-xl bg-white/[0.01] border border-white/5 text-white/20 hover:text-white hover:bg-white/5 transition-all"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  </>
  );
}
