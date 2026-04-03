"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Package, Plus, Pencil, Trash2, Loader2, X, Check, Star } from "lucide-react";
import { apiClient, API_URL } from "../../../../lib/api-client";
import ImageUpload from "../../../../components/admin/ImageUpload";

type Service = {
  id: string;
  name: string;
  nameEn?: string;
  image?: string;
  price: string;
  priceNote?: string;
  badge?: string;
  desc?: string;
  descEn?: string;
  features?: string[];
  isPopular: boolean;
  isComingSoon: boolean;
  glowColor?: string;
  sortOrder: number;
  created_at: string;
};

const emptyForm = { name: "", nameEn: "", image: "", price: "", priceNote: "", badge: "", desc: "", descEn: "", features: "", isPopular: false, isComingSoon: false, glowColor: "glass-card-glow-blue", sortOrder: 0 };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Service[]>("/api/services");
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (s: Service) => {
    setForm({
      name: s.name, nameEn: s.nameEn || "", image: s.image || "", price: s.price, priceNote: s.priceNote || "",
      badge: s.badge || "", desc: s.desc || "", descEn: s.descEn || "",
      features: (s.features || []).join("\n"), isPopular: s.isPopular, isComingSoon: s.isComingSoon,
      glowColor: s.glowColor || "", sortOrder: s.sortOrder,
    });
    setEditing(s.id);
    setShowForm(true);
  };

  const save = async () => {
    setSaving(true);
    const body = { ...form, features: form.features.split("\n").map(f => f.trim()).filter(Boolean) };
    try {
      if (editing) {
        await apiClient.patch(`/api/services/${editing}`, body);
      } else {
        await apiClient.post("/api/services", body);
      }
      setShowForm(false);
      load();
    } catch (err) {
      alert("Gagal menyimpan layanan");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Hapus layanan ini?")) return;
    try {
      await apiClient.delete(`/api/services/${id}`);
      load();
    } catch (err) {
      alert("Gagal menghapus layanan");
    }
  };

  const glowColors: Record<string, string> = { "glass-card-glow-blue": "#6366f1", "glass-card-glow-emerald": "#34d399", "glass-card-glow-amber": "#fbbf24", "glass-card-glow-violet": "#a78bfa", "glass-card-glow-rose": "#fb7185" };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Package size={22} className="text-amber-400" /> Paket Layanan</h1>
          <p className="text-sm text-white/40 mt-0.5">{services.length} layanan aktif</p>
        </div>
        <button onClick={openNew} className="btn-glass text-xs"><Plus size={15} /> Tambah Layanan</button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" style={{ cursor: "default" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? "Edit Layanan" : "Tambah Layanan"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-white/30 hover:text-white/60"><X size={18} /></button>
            </div>
            <InputField label="Nama Layanan *" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Paket UMKM" />
            <ImageUpload label="Gambar Layanan" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="Masukkan URL atau unggah file..." />
            <InputField label="Nama (EN)" value={form.nameEn} onChange={v => setForm({ ...form, nameEn: v })} placeholder="SME Package" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Harga *" value={form.price} onChange={v => setForm({ ...form, price: v })} placeholder="Rp 1.5 — 3 Juta" />
              <InputField label="Catatan Harga" value={form.priceNote} onChange={v => setForm({ ...form, priceNote: v })} placeholder="Tergantung kompleksitas" />
            </div>
            <InputField label="Badge" value={form.badge} onChange={v => setForm({ ...form, badge: v })} placeholder="Populer" />
            <TextAreaField label="Deskripsi" value={form.desc} onChange={v => setForm({ ...form, desc: v })} placeholder="Deskripsi layanan..." />
            <TextAreaField label="Deskripsi (EN)" value={form.descEn} onChange={v => setForm({ ...form, descEn: v })} placeholder="English description..." />
            <TextAreaField label="Fitur (satu per baris)" value={form.features} onChange={v => setForm({ ...form, features: v })} placeholder="Landing page responsive&#10;Domain .com gratis&#10;SEO dasar" />
            <div className="flex gap-3">
              <InputField label="Sort Order" type="number" value={String(form.sortOrder)} onChange={v => setForm({ ...form, sortOrder: Number(v) })} placeholder="0" />
              <div className="flex items-end gap-2 pb-0.5">
                <ToggleBtn active={form.isPopular} onClick={() => setForm({ ...form, isPopular: !form.isPopular })} label="Populer" color="#fbbf24" />
                <ToggleBtn active={form.isComingSoon} onClick={() => setForm({ ...form, isComingSoon: !form.isComingSoon })} label="Segera" color="#6366f1" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Glow Color</label>
              <div className="flex gap-2">
                {Object.entries(glowColors).map(([k, c]) => (
                  <button key={k} onClick={() => setForm({ ...form, glowColor: k })} className="w-8 h-8 rounded-lg transition-all" style={{ background: `${c}20`, border: `2px solid ${form.glowColor === k ? c : "transparent"}` }}>
                    <div className="w-3 h-3 rounded-full mx-auto" style={{ background: c }} />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)} className="btn-glass text-xs flex-1">Batal</button>
              <button onClick={save} disabled={saving || !form.name || !form.price} className="btn-solid text-xs flex-1 justify-center disabled:opacity-40">
                {saving ? <Loader2 size={14} className="animate-spin" /> : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white/20" size={24} /></div>
      ) : services.length === 0 ? (
        <div className="glass-card p-12 text-center" style={{ cursor: "default" }}>
          <Package size={40} className="text-white/8 mx-auto mb-3" />
          <p className="text-sm text-white/25">Belum ada layanan</p>
          <button onClick={openNew} className="btn-glass text-xs mt-4"><Plus size={14} /> Tambah Pertama</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.id} className="glass-card glass-card-glow group p-0 overflow-hidden space-y-0" style={{ cursor: "default" }}>
              {s.image && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                  <img 
                    src={s.image.startsWith("http") ? s.image : `${API_URL}${s.image}`} 
                    alt={s.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              )}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{s.name}</p>
                      {s.isPopular && <Star size={12} className="text-amber-400 fill-amber-400" />}
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">{s.price}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-white/20 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"><Pencil size={13} /></button>
                    <button onClick={() => del(s.id)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={13} /></button>
                  </div>
                </div>
                {s.badge && <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>{s.badge}</span>}
                {s.desc && <p className="text-xs text-white/40 line-clamp-2">{s.desc}</p>}
                {s.features && s.features.length > 0 && (
                  <div className="space-y-1">
                    {(s.features as string[]).slice(0, 3).map((f, i) => (
                      <p key={i} className="text-[11px] text-white/35 flex items-center gap-1.5">
                        <Check size={10} className="text-emerald-400 flex-shrink-0" />{f}
                      </p>
                    ))}
                    {(s.features as string[]).length > 3 && <p className="text-[10px] text-white/20">+{(s.features as string[]).length - 3} lagi</p>}
                  </div>
                )}
                <div className="flex gap-2 pt-1 text-[10px]">
                  {s.isComingSoon && <span className="px-2 py-0.5 rounded-lg" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>Coming Soon</span>}
                  <span className="px-2 py-0.5 rounded-lg bg-white/5 text-white/20">Sort: {s.sortOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="flex-1">
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
    </div>
  );
}

function ToggleBtn({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color: string }) {
  return (
    <button onClick={onClick} className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all" style={{ background: active ? `${color}15` : "rgba(255,255,255,0.04)", color: active ? color : "rgba(255,255,255,0.4)", border: `1px solid ${active ? `${color}30` : "rgba(255,255,255,0.08)"}` }}>
      {label}
    </button>
  );
}
