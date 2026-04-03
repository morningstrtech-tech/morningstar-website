import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Rocket, Code2, Zap, Shield, Globe } from "lucide-react";
import TechStack from "../components/TechStack";

export default function HomePage() {
  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      {/* Background Image */}
      <img
        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg"
        alt="MS.Tech Digital Agency Background Image"
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

      {/* Content */}
      <div className="z-10 relative">
        <div className="sm:pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto pt-28 px-5 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 badge-glass animate-fade-slide delay-100">
              <span className="badge-inner flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Baru
              </span>
              <span className="text-sm font-medium text-white/80 font-sans">
                Solusi Digital Modern untuk Bisnis Anda
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight font-[family-name:var(--font-instrument-serif)] font-normal animate-fade-slide delay-200">
              Modernisasi Bisnis Anda{" "}
              <br className="hidden sm:block" />
              di Era Digital & AI
            </h1>

            {/* Subtitle */}
            <p className="sm:text-lg text-base text-white/70 max-w-xl mt-6 mx-auto leading-relaxed animate-fade-slide delay-300">
              MS.tech membantu UMKM hingga Enterprise membangun
              kehadiran digital yang modern, profesional, dan berdampak.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide delay-400">
              <Link href="/services" className="btn-glass group">
                <Rocket className="h-4 w-4" />
                Lihat Layanan
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white/70 hover:text-white font-sans transition-colors duration-200 cursor-pointer group">
                Hubungi Kami
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-24 max-w-4xl animate-fade-slide delay-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Code2, num: "10+", label: "Proyek Selesai" },
                { icon: Zap, num: "99%", label: "Kepuasan Klien" },
                { icon: Shield, num: "24/7", label: "Support" },
                { icon: Globe, num: "3+", label: "Tahun Pengalaman" },
              ].map((stat, i) => (
                <div key={stat.label} className="glass-card p-5 text-center group" style={{ animationDelay: `${i * 0.15}s` }}>
                  <stat.icon className="w-5 h-5 text-white/40 mx-auto mb-3 group-hover:text-white/60 transition-colors duration-300" />
                  <p className="text-2xl sm:text-3xl font-[family-name:var(--font-instrument-serif)] text-white">{stat.num}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <TechStack />
        </div>
      </div>
    </section>
  );
}
