"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Missions" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-we-work", label: "How We Work" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/70 backdrop-blur-2xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center cursor-pointer z-50">
            <Image
              src="/logo.webp"
              alt="MS.tech Logo"
              width={160}
              height={56}
              className="h-[42px] sm:h-[56px] w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation — Pill Style */}
          <nav className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-white/[0.04] px-1.5 py-1.5 ring-1 ring-white/8 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium font-sans rounded-full transition-all duration-300 cursor-pointer ${
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 font-sans transition-all duration-300 cursor-pointer active:scale-95"
              >
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/12 backdrop-blur-md transition-all duration-300 active:scale-90 cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex h-6 w-6 flex-col items-center justify-center gap-1.5">
              <span className={`block h-0.5 w-6 bg-white/80 transition-all duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white/80 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white/80 transition-all duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out border-b border-white/8 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <div className="px-6 pt-24 pb-10 space-y-1 h-full overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-4 rounded-2xl text-lg font-medium transition-all duration-300 cursor-pointer ${
                pathname === link.href ? "text-white bg-white/8" : "text-white/50 hover:text-white hover:bg-white/[0.03]"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {pathname === link.href && <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
              </div>
            </Link>
          ))}
          <Link
            href="/contact"
            className="block w-full text-center rounded-full bg-white px-6 py-4 text-base font-bold text-neutral-900 mt-6 active:scale-[0.98] transition-transform duration-200 cursor-pointer"
          >
            Contact MS.tech
          </Link>
        </div>
      </div>
    </header>
  );
}
