"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, Pencil, Trash2, ExternalLink, Loader2, Image as ImageIcon, X, Check, Activity } from "lucide-react";
import { apiClient, API_URL } from "@/lib/api-client";
import ImageUpload from "@/components/admin/ImageUpload";

type Project = {
  id: string;
  name: string;
  image?: string;
  desc: string;
  descEn?: string;
  category: string;
  techStack?: string[];
  url?: string;
  isLive: boolean;
  glowColor?: string;
  sortOrder: number;
  created_at: string;
};

const emptyForm = { 
  name: "", 
  category: "", 
  image: "",
  desc: "", 
  descEn: "", 
  techStack: "", 
  url: "", 
  isLive: false, 
  glowColor: "glass-card-glow-blue", 
  sortOrder: 0 
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Project[]>("/api/projects");
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setForm({
      name: p.name,
      category: p.category,
      image: p.image || "",
      desc: p.desc,
      descEn: p.descEn || "",
      techStack: (p.techStack || []).join("\n"),
      url: p.url || "",
      isLive: p.isLive,
      glowColor: p.glowColor || "glass-card-glow-blue",
      sortOrder: p.sortOrder,
    });
    setEditing(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      ...form,
      techStack: form.techStack.split(/[\n,]/).map(t => t.trim()).filter(Boolean)
    };
    try {
      if (editing) {
        await apiClient.patch(`/api/projects/${editing}`, body);
      } else {
        await apiClient.post("/api/projects", body);
      }
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      alert("Gagal menyimpan proyek");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus proyek ini?")) return;
    try {
      await apiClient.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert("Gagal menghapus proyek");
    }
  };

  const filtered = projects.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const glowColors: Record<string, string> = { 
    "glass-card-glow-blue": "#6366f1", 
    "glass-card-glow-emerald": "#34d399", 
    "glass-card-glow-amber": "#fbbf24", 
    "glass-card-glow-violet": "#a78bfa", 
    "glass-card-glow-rose": "#fb7185" 
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity size={22} className="text-indigo-400" /> Kelola Proyek
          </h1>
          <p className="text-sm text-white/40 mt-1">Total {projects.length} proyek terdaftar</p>
        </div>
        <button 
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Tambah Proyek</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input
            type="text"
            placeholder="Cari nama atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
          <div className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" style={{ cursor: "default" }}>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <h2 className="text-lg font-semibold text-white">{editing ? "Edit Proyek" : "Tambah Proyek Baru"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-white/30 hover:text-white/60"><X size={18} /></button>
            </div>
            
            <InputField label="Nama Proyek *" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Lumina Estate" />
            <ImageUpload label="Gambar Proyek" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="Masukkan URL atau unggah file..." />
            <InputField label="Kategori *" value={form.category} onChange={v => setForm({ ...form, category: v })} placeholder="Real Estate / Portfolio" />
            
            <div className="grid grid-cols-1 gap-4">
              <TextAreaField label="Deskripsi (ID) *" value={form.desc} onChange={v => setForm({ ...form, desc: v })} placeholder="Deskripsi proyek..." />
              <TextAreaField label="Deskripsi (EN)" value={form.descEn} onChange={v => setForm({ ...form, descEn: v })} placeholder="English description..." />
            </div>

            <TextAreaField label="Tech Stack (satu per baris)" value={form.techStack} onChange={v => setForm({ ...form, techStack: v })} placeholder="Next.js&#10;Tailwind CSS&#10;Supabase" />
            
            <InputField label="URL Website" value={form.url} onChange={v => setForm({ ...form, url: v })} placeholder="https://mstech.agency" />

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Sort Order" type="number" value={String(form.sortOrder)} onChange={v => setForm({ ...form, sortOrder: Number(v) })} placeholder="0" />
              <div className="flex items-end pb-0.5">
                <ToggleBtn active={form.isLive} onClick={() => setForm({ ...form, isLive: !form.isLive })} label="Status Live" color="#34d399" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Glow Effect Color</label>
              <div className="flex gap-2">
                {Object.entries(glowColors).map(([k, c]) => (
                  <button key={k} onClick={() => setForm({ ...form, glowColor: k })} className="w-8 h-8 rounded-lg transition-all" style={{ background: `${c}20`, border: `2px solid ${form.glowColor === k ? c : "transparent"}` }}>
                    <div className="w-3 h-3 rounded-full mx-auto" style={{ background: c }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={() => setShowForm(false)} className="btn-glass text-xs flex-1">Batal</button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.category || !form.desc} className="btn-solid text-xs flex-1 justify-center disabled:opacity-40 bg-indigo-600 hover:bg-indigo-500">
                {saving ? <Loader2 size={14} className="animate-spin" /> : "Simpan Proyek"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-white/20 animate-spin" />
          <span className="text-xs text-white/30">Memuat koleksi proyek...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div key={project.id} className="glass-card glass-card-glow group overflow-hidden border border-white/5 hover:border-white/10 transition-all flex flex-col" style={{ borderColor: project.glowColor ? glowColors[project.glowColor] + '20' : 'transparent' }}>
              <div className="relative aspect-video overflow-hidden bg-white/[0.02] flex items-center justify-center border-b border-white/5">
                {project.image ? (
                  <img 
                    src={project.image.startsWith("http") ? project.image : `${API_URL}${project.image}`} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="icon-container icon-container-lg">
                    <ImageIcon className="w-6 h-6 text-white/20 group-hover:text-white/40 transition-colors duration-300" />
                  </div>
                )}
                {project.isLive && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-md flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">Live</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-md">
                  <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">{project.category}</span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-white truncate">{project.name}</h3>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-indigo-400 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-white/40 line-clamp-2 mb-4 leading-relaxed flex-1">{project.desc}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(project.techStack || []).slice(0, 3).map((t, i) => (
                    <span key={`${t}-${i}`} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">{t}</span>
                  ))}
                  {(project.techStack || []).length > 3 && <span className="text-[9px] text-white/20">...</span>}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] text-white/20 font-medium">Order: {project.sortOrder}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(project)} className="p-2 text-white/20 hover:text-indigo-400 hover:bg-indigo-400/5 rounded-lg transition-all">
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-white/20 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center text-center glass-card">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-white/10" />
              </div>
              <h3 className="text-white font-medium">Tidak ada proyek ditemukan</h3>
              <p className="text-xs text-white/30 mt-1 max-w-[240px]">
                Coba sesuaikan kata kunci pencarian atau tambah proyek baru.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="flex-1">
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder} 
        className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)]" 
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} 
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder} 
        rows={3} 
        className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none resize-none focus:ring-1 focus:ring-indigo-500/50 transition-all" 
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} 
      />
    </div>
  );
}

function ToggleBtn({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color: string }) {
  return (
    <button 
      onClick={onClick} 
      className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2" 
      style={{ 
        background: active ? `${color}15` : "rgba(255,255,255,0.04)", 
        color: active ? color : "rgba(255,255,255,0.4)", 
        border: `1px solid ${active ? `${color}30` : "rgba(255,255,255,0.08)"}` 
      }}
    >
      <div className={`w-2 h-2 rounded-full ${active ? "" : "bg-white/20"}`} style={{ background: active ? color : undefined }} />
      {label}
    </button>
  );
}
