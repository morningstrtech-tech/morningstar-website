import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, PenTool, Code, TestTube, Rocket, Wrench, ArrowRight, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "Cara Kerja — How We Work",
  description: "Alur kerja pembuatan website di MS.tech — dari konsultasi hingga maintenance.",
};

const steps = [
  { icon: MessageSquare, step: "01", title: "Konsultasi", titleEn: "Consultation", desc: "Diskusi kebutuhan, tujuan bisnis, dan target audiens Anda.", descEn: "Discuss your needs, business goals, and target audience.", glowColor: "glass-card-glow-blue" },
  { icon: PenTool, step: "02", title: "Perencanaan", titleEn: "Planning", desc: "Wireframe, desain UI/UX, dan arsitektur teknis.", descEn: "Wireframes, UI/UX design, and technical architecture.", glowColor: "glass-card-glow-violet" },
  { icon: Code, step: "03", title: "Pengembangan", titleEn: "Development", desc: "Membangun website dengan teknologi modern dan kode berkualitas.", descEn: "Building the website with modern tech and clean code.", glowColor: "glass-card-glow-emerald" },
  { icon: TestTube, step: "04", title: "Pengujian", titleEn: "Testing", desc: "QA menyeluruh — fungsionalitas, responsivitas, dan kecepatan.", descEn: "Comprehensive QA — functionality, responsiveness, and speed.", glowColor: "glass-card-glow-amber" },
  { icon: Rocket, step: "05", title: "Deployment", titleEn: "Deployment", desc: "Launch ke production — domain, SSL, dan optimasi performa.", descEn: "Launch to production — domain, SSL, and performance.", glowColor: "glass-card-glow-rose" },
  { icon: Wrench, step: "06", title: "Maintenance", titleEn: "Maintenance", desc: "Dukungan berkelanjutan — update, monitoring, dan perbaikan.", descEn: "Ongoing support — updates, monitoring, and fixes.", glowColor: "glass-card-glow-blue" },
];

export default function HowWeWorkPage() {
  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg" alt="" className="w-full h-full object-cover absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      <div className="z-10 relative">
        <div className="sm:pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto pt-28 px-5 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 badge-glass animate-fade-slide delay-100">
              <span className="badge-inner flex items-center gap-1"><GitBranch className="w-3 h-3" /> Process</span>
              <span className="text-sm font-medium text-white/80 font-sans">Cara Kerja Kami</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight font-[family-name:var(--font-instrument-serif)] font-normal animate-fade-slide delay-200">
              Proses Kerja Kami
            </h1>
            <p className="sm:text-lg text-base text-white/70 max-w-xl mt-6 mx-auto leading-relaxed animate-fade-slide delay-300">
              Alur kerja terstruktur dan transparan untuk memastikan proyek berjalan lancar.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-white/16 via-white/8 to-transparent hidden sm:block" />

              <div className="space-y-8 lg:space-y-12">
                {steps.map((s, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <div key={s.step} className={`relative flex flex-col sm:flex-row items-start gap-6 ${isEven ? "animate-fade-left" : "animate-fade-right"} ${!isEven ? "lg:flex-row-reverse" : ""}`} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                      {/* Step circle */}
                      <div className="sm:absolute sm:left-6 lg:left-1/2 sm:-translate-x-1/2 z-10">
                        <div className="h-12 w-12 rounded-full bg-white/6 ring-1 ring-white/12 backdrop-blur-sm flex items-center justify-center group hover:bg-white/10 hover:ring-white/20 transition-all duration-300 cursor-default">
                          <s.icon className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
                        </div>
                      </div>
                      {/* Card */}
                      <div className={`sm:ml-20 lg:ml-0 lg:w-[calc(50%-40px)] ${isEven ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}>
                        <div className={`glass-card glass-card-glow ${s.glowColor} p-6 lg:p-8 group`}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="step-number">{s.step}</span>
                            <h3 className="text-xl font-[family-name:var(--font-instrument-serif)] text-white">{s.title}</h3>
                          </div>
                          <p className="text-xs text-white/40 italic mb-3">{s.titleEn}</p>
                          <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
                          <p className="text-xs text-white/40 italic mt-2">{s.descEn}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center animate-fade-slide delay-700">
            <div className="glass-card inline-block px-8 py-8 max-w-lg">
              <Rocket className="w-6 h-6 text-white/40 mx-auto mb-4" />
              <p className="text-lg font-[family-name:var(--font-instrument-serif)] text-white mb-1">Siap memulai proyek Anda?</p>
              <p className="text-xs text-white/40 italic mb-5">Ready to start your project?</p>
              <Link href="/contact" className="btn-glass group">
                Hubungi Kami Sekarang
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
