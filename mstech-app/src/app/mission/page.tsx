import type { Metadata } from "next";
import { Target, Eye, Lightbulb, Store, Award, Gem } from "lucide-react";

export const metadata: Metadata = {
  title: "Misi Kami — Mission",
  description: "Misi utama MS.tech adalah memodernisasi usaha di era digital dan AI.",
};

const values = [
  { icon: Lightbulb, title: "Modernisasi Digital", titleEn: "Digital Modernization", desc: "Mengubah proses bisnis tradisional menjadi digital yang efisien, menjangkau lebih banyak pelanggan melalui platform online.", glowColor: "glass-card-glow-blue" },
  { icon: Gem, title: "Inovasi Teknologi", titleEn: "Technology Innovation", desc: "Menerapkan teknologi terkini seperti AI, animasi 2.5D, dan arsitektur modern untuk memberikan solusi terbaik.", glowColor: "glass-card-glow-violet" },
  { icon: Store, title: "Pemberdayaan UMKM", titleEn: "UMKM Empowerment", desc: "Menyediakan solusi website yang terjangkau dan berkualitas untuk membantu UMKM bersaing di pasar digital.", glowColor: "glass-card-glow-emerald" },
  { icon: Award, title: "Kualitas Premium", titleEn: "Premium Quality", desc: "Setiap proyek dibangun dengan standar kualitas tertinggi, performa optimal, dan desain yang memukau.", glowColor: "glass-card-glow-amber" },
];

export default function MissionPage() {
  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg" alt="" className="w-full h-full object-cover absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      <div className="z-10 relative">
        <div className="sm:pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto pt-28 px-5 pb-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 badge-glass animate-fade-slide delay-100">
              <span className="badge-inner flex items-center gap-1"><Target className="w-3 h-3" /> Mission</span>
              <span className="text-sm font-medium text-white/80 font-sans">Misi Kami</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight font-[family-name:var(--font-instrument-serif)] font-normal animate-fade-slide delay-200">
              Memodernisasi Bisnis
              <br className="hidden sm:block" />
              di Era Digital & AI
            </h1>
            <p className="sm:text-lg text-base text-white/70 max-w-xl mt-6 mx-auto leading-relaxed animate-fade-slide delay-300">
              Tujuan utama kami adalah membantu bisnis di Indonesia untuk bertransformasi digital — menjadi lebih modern, efisien, dan kompetitif di era AI.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <div className="glass-card glass-card-glow glass-card-glow-emerald p-8 animate-fade-left delay-300">
              <div className="icon-container mb-6">
                <Eye className="w-5 h-5 text-white/60" />
              </div>
              <h3 className="text-xl font-[family-name:var(--font-instrument-serif)] text-white mb-1">Visi <span className="text-white/40 text-sm font-sans">/ Vision</span></h3>
              <p className="text-sm text-white/70 leading-relaxed mt-3">Menjadi mitra teknologi terpercaya yang memimpin transformasi digital bagi bisnis Indonesia, dari UMKM hingga perusahaan besar.</p>
              <p className="mt-3 text-white/40 text-xs italic">To be a trusted technology partner leading digital transformation for Indonesian businesses.</p>
            </div>
            <div className="glass-card glass-card-glow glass-card-glow-blue p-8 animate-fade-right delay-400">
              <div className="icon-container mb-6">
                <Target className="w-5 h-5 text-white/60" />
              </div>
              <h3 className="text-xl font-[family-name:var(--font-instrument-serif)] text-white mb-1">Misi <span className="text-white/40 text-sm font-sans">/ Mission</span></h3>
              <p className="text-sm text-white/70 leading-relaxed mt-3">Membangun website dan solusi digital berkualitas tinggi dengan harga terjangkau, menggunakan teknologi modern, dan memberikan pengalaman pengguna yang luar biasa.</p>
              <p className="mt-3 text-white/40 text-xs italic">Building high-quality digital solutions at affordable prices with outstanding UX.</p>
            </div>
          </div>

          {/* Values */}
          <div className="mt-20 max-w-5xl mx-auto">
            <p className="text-xs text-white/30 text-center mb-10 uppercase tracking-widest animate-fade-slide delay-400">Nilai-Nilai Kami / Our Values</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v, i) => (
                <div key={v.title} className={`glass-card glass-card-glow ${v.glowColor} p-6 text-center group animate-fade-slide`} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                  <div className="icon-container mx-auto mb-5">
                    <v.icon className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <h4 className="text-base font-[family-name:var(--font-instrument-serif)] text-white mb-1">{v.title}</h4>
                  <p className="text-xs text-white/40 italic mb-3">{v.titleEn}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="mt-20 text-center animate-fade-slide delay-600">
            <div className="glass-card glass-card-glow glass-card-glow-rose inline-block px-8 py-8 max-w-2xl">
              <p className="text-lg sm:text-xl font-[family-name:var(--font-instrument-serif)] text-white/90 italic leading-relaxed">&ldquo;Kami percaya setiap bisnis layak memiliki kehadiran digital yang memukau.&rdquo;</p>
              <p className="mt-2 text-xs text-white/40 italic">&ldquo;We believe every business deserves a stunning digital presence.&rdquo;</p>
              <div className="section-divider my-4 mx-auto w-12" />
              <p className="text-sm text-white/50">— Tim MS.tech</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
