import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, ExternalLink, ArrowRight } from "lucide-react";
import { getIcon } from "../../lib/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | MS.tech",
  description: "Kumpulan proyek terbaik yang telah dikerjakan oleh MS.tech.",
};

async function getProjects() {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/api\/?$/, "");
  try {
    const res = await fetch(`${API_URL}/api/projects`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Fetch projects error:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").trim().replace(/\/+$/, "").replace(/\/api\/?$/, "");
  const projects = await getProjects();

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img
        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg"
        alt=""
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      <div className="z-10 relative">
        <div className="sm:pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto pt-28 px-5 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 badge-glass animate-fade-slide delay-100">
              <span className="badge-inner flex items-center gap-1">
                <FolderOpen className="w-3 h-3" /> Portfolio
              </span>
              <span className="text-sm font-medium text-white/80 font-sans">Hasil Karya Kami</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight font-[family-name:var(--font-instrument-serif)] font-normal animate-fade-slide delay-200">
              Proyek Terbaik Kami
            </h1>
            <p className="sm:text-lg text-base text-white/70 max-w-xl mt-6 mx-auto leading-relaxed animate-fade-slide delay-300">
              Beberapa proyek terbaik yang telah kami selesaikan untuk klien kami.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {projects.length > 0 ? (
              projects.map((p: any, i: number) => {
                const Icon = getIcon(p.category?.toLowerCase());
                return (
                  <div
                    key={p.id}
                    className={`glass-card glass-card-glow ${p.glowColor || "glass-card-glow-emerald"} overflow-hidden group animate-fade-slide flex flex-col`}
                    style={{ animationDelay: `${0.2 + i * 0.12}s` }}
                  >
                    {/* Preview header */}
                    <div className="relative h-48 bg-white/[0.02] flex items-center justify-center overflow-hidden border-b border-white/5 group-hover:scale-[1.02] transition-transform duration-500">
                      {p.image ? (
                        <img 
                          src={p.image.startsWith("http") ? p.image : `${API_URL}${p.image.startsWith("/") ? "" : "/"}${p.image}`} 
                          alt={p.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="icon-container icon-container-lg">
                          <Icon className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                        </div>
                      )}
                      
                      {p.isLive && (
                        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/12">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                          Live
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-neutral-900 bg-white/90 rounded-full px-2.5 py-0.5">
                        {p.category}
                      </span>
                      <h3 className="text-xl font-[family-name:var(--font-instrument-serif)] text-white mt-4 mb-2">
                        {p.name}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed mb-1">{p.desc}</p>
                      <p className="text-xs text-white/40 italic mb-5">{p.descEn}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(p.techStack || []).map((t: string, idx: number) => (
                          <span
                            key={`${t}-${idx}`}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-white/50 ring-1 ring-white/8 cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.isLive ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 cursor-pointer group/link"
                        >
                          Kunjungi Website
                          <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      ) : (
                        <span className="text-sm text-white/30 italic">Segera Hadir / Coming Soon</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center glass-card">
                <p className="text-white/50 italic">Belum ada proyek yang ditampilkan.</p>
              </div>
            )}
          </div>

          <div className="mt-16 text-center animate-fade-slide delay-600">
            <Link href="/contact" className="btn-glass group">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              Mulai Proyek Anda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
