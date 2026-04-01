"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const SocialIG = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const SocialLI = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>;
const SocialGH = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "morningstr.tech@gmail.com", href: "mailto:morningstr.tech@gmail.com", glowColor: "glass-card-glow-blue" },
  { icon: Phone, label: "Telepon / Phone", value: "+62 858-8319-8735", href: "tel:+6285883198735", glowColor: "glass-card-glow-emerald" },
  { icon: MessageCircle, label: "WhatsApp", value: "+62 858-8319-8735", href: "https://wa.me/6285883198735", glowColor: "glass-card-glow-emerald" },
];

const socials = [
  { icon: SocialIG, label: "Instagram", href: "#" },
  { icon: SocialLI, label: "LinkedIn", href: "#" },
  { icon: SocialGH, label: "GitHub", href: "https://github.com/morningstrtech-tech" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg" alt="" className="w-full h-full object-cover absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

      <div className="z-10 relative">
        <div className="sm:pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto pt-28 px-5 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 badge-glass animate-fade-slide delay-100">
              <span className="badge-inner flex items-center gap-1"><Send className="w-3 h-3" /> Contact</span>
              <span className="text-sm font-medium text-white/80 font-sans">Hubungi Kami</span>
            </div>
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight font-[family-name:var(--font-instrument-serif)] font-normal animate-fade-slide delay-200">
              Hubungi Kami
            </h1>
            <p className="sm:text-lg text-base text-white/70 max-w-xl mt-6 mx-auto leading-relaxed animate-fade-slide delay-300">
              Punya pertanyaan atau ingin memulai proyek? Jangan ragu untuk menghubungi kami.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4 animate-fade-left delay-300">
              {contactInfo.map((info, i) => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card glass-card-glow ${info.glowColor} p-5 flex items-center gap-4 cursor-pointer group`}
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="icon-container shrink-0">
                    <info.icon className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="text-sm font-medium text-white truncate">{info.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
                </a>
              ))}

              {/* Social Media */}
              <div className="glass-card p-5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Media Sosial / Social Media</p>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="icon-container cursor-pointer group/social"
                      title={s.label}
                    >
                      <span className="text-white/40 group-hover/social:text-white/80 transition-colors duration-300">
                        <s.icon />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 animate-fade-right delay-400">
              <form onSubmit={handleSubmit} className="glass-card glass-card-glow glass-card-glow-violet p-6 lg:p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="icon-container">
                    <Mail className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-[family-name:var(--font-instrument-serif)] text-white">Kirim Pesan</h3>
                    <p className="text-xs text-white/40">Send a Message</p>
                  </div>
                </div>

                <div className="section-divider" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs text-white/40 mb-2 font-medium">Nama / Name *</label>
                    <input
                      id="name" type="text" required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/8 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:ring-white/20 focus:bg-white/[0.06] outline-none transition-all duration-200"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-white/40 mb-2 font-medium">Email *</label>
                    <input
                      id="email" type="email" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/8 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:ring-white/20 focus:bg-white/[0.06] outline-none transition-all duration-200"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs text-white/40 mb-2 font-medium">Subjek / Subject *</label>
                  <input
                    id="subject" type="text" required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/8 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:ring-white/20 focus:bg-white/[0.06] outline-none transition-all duration-200"
                    placeholder="Paket UMKM / Enterprise / 2.5D"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-white/40 mb-2 font-medium">Pesan / Message *</label>
                  <textarea
                    id="message" required rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/8 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:ring-white/20 focus:bg-white/[0.06] outline-none transition-all duration-200 resize-none"
                    placeholder="Ceritakan kebutuhan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-white text-neutral-900 py-3.5 text-sm font-semibold hover:bg-neutral-100 transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] group"
                >
                  {status === "sending" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
                  ) : status === "success" ? (
                    <><CheckCircle2 className="w-4 h-4" /> Pesan Terkirim!</>
                  ) : (
                    <><Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Kirim Pesan / Send Message</>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-center text-sm text-white/60 animate-fade-slide">Terima kasih! Kami akan segera menghubungi Anda.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
