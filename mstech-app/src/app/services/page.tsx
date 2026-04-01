"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Crown, Star, ArrowRight, ChevronDown, X, Loader2 } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { apiClient } from "@/lib/api-client";

function ServiceCard({ pkg, index, isExpanded }: { pkg: any; index: number; isExpanded?: boolean }) {
  const Icon = getIcon(pkg.iconName || "package");

  return (
    <div
      className={`glass-card glass-card-glow ${pkg.glowColor || "glass-card-glow-emerald"} p-7 sm:p-8 flex flex-col animate-fade-slide group ${pkg.isPopular ? "ring-1 ring-white/16" : ""} ${pkg.isComingSoon ? "opacity-80" : ""}`}
      style={{ animationDelay: `${0.2 + index * 0.12}s` }}
    >
      {/* Image / Icon + Badge */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        {pkg.image ? (
          <div className="w-full h-32 -mt-7 -mx-7 sm:-mt-8 sm:-mx-8 mb-6 overflow-hidden border-b border-white/5 relative group-hover:scale-[1.02] transition-all duration-500">
            <img 
              src={pkg.image.startsWith("http") ? pkg.image : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${pkg.image}`} 
              alt={pkg.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="icon-container icon-container-lg">
            <Icon className="w-6 h-6 text-white/50 group-hover:text-white/80 transition-colors duration-300" />
          </div>
        )}
        
        <span className={`text-xs font-semibold rounded-full px-3 py-1 flex items-center gap-1 shrink-0 ${
          pkg.isComingSoon
            ? "text-white/70 bg-white/10 ring-1 ring-white/10"
            : "text-neutral-900 bg-white/90"
        } ${pkg.image ? "absolute top-4 right-4" : ""}`}>
          {pkg.isPopular && <Crown className="w-3 h-3" />}
          {pkg.badge || (pkg.isComingSoon ? "Coming Soon" : "")}
        </span>
      </div>

      <h3 className="text-2xl font-[family-name:var(--font-instrument-serif)] text-white">{pkg.name}</h3>
      <p className="text-xs text-white/40 mt-1 italic">{pkg.nameEn}</p>

      <div className="mt-5 mb-1">
        <span className={`text-2xl font-medium font-[family-name:var(--font-instrument-serif)] ${pkg.isComingSoon ? "text-white/50" : "text-gradient"}`}>{pkg.price}</span>
      </div>
      <p className="text-xs text-white/40 mb-6">{pkg.priceNote}</p>

      <p className="text-sm text-white/70 leading-relaxed mb-1">{pkg.desc}</p>
      <p className="text-xs text-white/40 italic mb-8">{pkg.descEn}</p>

      <div className="section-divider mb-6" />

      <ul className={`space-y-3 mb-8 flex-1 ${isExpanded ? "grid grid-cols-1 sm:grid-cols-2 gap-x-4" : ""}`}>
        {(pkg.features || []).map((f: string, i: number) => (
          <li key={`${f}-${i}`} className="flex items-start gap-3 text-sm text-white/70">
            <Check className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {pkg.isComingSoon ? (
        <div className="w-full text-center rounded-full py-3.5 text-sm font-semibold bg-white/5 text-white/40 ring-1 ring-white/8 cursor-default flex items-center justify-center gap-2">
          Segera Hadir / Coming Soon
        </div>
      ) : (
        <Link
          href="/contact"
          className={`w-full text-center rounded-full py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group/btn active:scale-[0.98] ${
            pkg.isPopular
              ? "bg-white text-neutral-900 hover:bg-neutral-100 hover:shadow-lg hover:shadow-white/10"
              : "bg-white/8 text-white ring-1 ring-white/12 hover:bg-white/12 hover:ring-white/20"
          }`}
        >
          {pkg.isPopular ? "Pilih Paket Ini" : "Konsultasi Gratis"}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const [showAll, setShowAll] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await apiClient.get<any[]>("/api/services");
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const mainPackages = services.filter((p) => !p.isComingSoon);
  const comingSoonPackages = services.filter((p) => p.isComingSoon);

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg" alt="" className="w-full h-full object-cover absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      <div className="z-10 relative">
        <div className="sm:pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto pt-28 px-5 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 badge-glass animate-fade-slide delay-100">
              <span className="badge-inner flex items-center gap-1"><Star className="w-3 h-3" /> Services</span>
              <span className="text-sm font-medium text-white/80 font-sans">Layanan Kami</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight font-[family-name:var(--font-instrument-serif)] font-normal animate-fade-slide delay-200">
              Paket Layanan Kami
            </h1>
            <p className="sm:text-lg text-base text-white/70 max-w-xl mt-6 mx-auto leading-relaxed animate-fade-slide delay-300">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Dari UMKM hingga Enterprise, kami siap membantu.
            </p>
          </div>

          {loading ? (
            <div className="mt-20 flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
            </div>
          ) : (
            <>
              {/* Main 3 Pricing Cards */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {mainPackages.length > 0 ? (
                  mainPackages.map((pkg, i) => (
                    <ServiceCard key={pkg.id} pkg={pkg} index={i} />
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center glass-card">
                    <p className="text-white/50 italic">Layanan sedang dalam pemeliharaan.</p>
                  </div>
                )}
              </div>

              {/* Toggle Button — Lihat Semua Layanan */}
              {comingSoonPackages.length > 0 && (
                <div className="mt-12 text-center animate-fade-slide delay-500">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="group inline-flex items-center gap-3 cursor-pointer transition-all duration-300"
                  >
                    <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-white/20 group-hover:to-white/40 transition-colors duration-300" />
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] ring-1 ring-white/8 hover:ring-white/16 px-6 py-3 text-sm font-medium text-white/60 hover:text-white transition-all duration-300">
                      {showAll ? (
                        <>
                          <X className="w-4 h-4" />
                          Sembunyikan
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60" />
                          </span>
                          Lihat Semua Layanan
                          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                        </>
                      )}
                    </span>
                    <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-white/20 group-hover:to-white/40 transition-colors duration-300" />
                  </button>
                  {!showAll && (
                    <p className="mt-3 text-xs text-white/30 animate-fade-in">+{comingSoonPackages.length} layanan lainnya segera hadir</p>
                  )}
                </div>
              )}

              {/* Coming Soon Cards — Expandable */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  showAll ? "max-h-[2000px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="section-divider mb-8" />
                  <p className="text-xs text-white/30 text-center mb-8 uppercase tracking-widest">Segera Hadir / Coming Soon</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {comingSoonPackages.map((pkg, i) => (
                      <ServiceCard key={pkg.id} pkg={pkg} index={i} isExpanded />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center animate-fade-slide delay-600">
            <div className="glass-card glass-card-glow glass-card-glow-blue inline-block px-8 py-8 max-w-lg">
              <p className="text-lg font-[family-name:var(--font-instrument-serif)] text-white mb-1">Butuh solusi khusus?</p>
              <p className="text-xs text-white/40 italic mb-5">Need a custom solution?</p>
              <Link href="/contact" className="btn-glass group">
                Hubungi Kami untuk Konsultasi Gratis
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
