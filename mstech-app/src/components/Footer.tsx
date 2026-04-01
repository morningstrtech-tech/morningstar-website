"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Heart, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Missions" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/contact", label: "Contact Us" },
];

const SocialIG = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const SocialLI = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>;
const SocialGH = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;

const socials = [
  { icon: SocialGH, label: "GitHub", href: "https://github.com/morningstrtech-tech" },
  { icon: SocialIG, label: "Instagram", href: "#" },
  { icon: SocialLI, label: "LinkedIn", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/6285883198735" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block cursor-pointer">
              <Image 
                src="/logo.webp" 
                alt="MS.tech Logo" 
                width={140} 
                height={56} 
                className="h-12 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-md">
              MS.tech — Smart Solutions for a Digital Future.
              Membantu modernisasi bisnis Anda di era digital dan AI.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center hover:bg-white/10 hover:ring-white/20 transition-all cursor-pointer group"
                  title={s.label}
                >
                  <s.icon className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">Navigasi</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">Kontak</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="mailto:morningstr.tech@gmail.com" className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">morningstr.tech@gmail.com</a></li>
              <li><a href="tel:+6285883198735" className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">+62 858-8319-8735</a></li>
              <li className="text-sm text-white/50">Indonesia 🇮🇩</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} MS.tech. All rights reserved.</p>
            <p className="text-xs text-white/40 flex items-center gap-1">Dibuat dengan <Heart className="w-3 h-3 text-red-400/60" /> di Indonesia</p>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white transition-all cursor-pointer bg-white/5 px-4 py-2 rounded-full ring-1 ring-white/10"
          >
            Kembali ke Atas
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
