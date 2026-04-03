"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Mail, Trash2, Eye, EyeOff, Loader2, Search, X } from "lucide-react";
import { apiClient } from "../../../../lib/api-client";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Message[]>("/api/messages");
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try {
      await apiClient.patch(`/api/messages/${id}/read`, {});
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "read" } : m));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: "read" } : null);
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    }
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Hapus pesan ini?")) return;
    try {
      await apiClient.delete(`/api/messages/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      alert("Gagal menghapus pesan");
    }
  };

  const filtered = messages.filter(m => {
    if (filter === "unread" && m.status !== "unread") return false;
    if (filter === "read" && m.status !== "read") return false;
    if (search) {
      const s = search.toLowerCase();
      return m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.subject.toLowerCase().includes(s);
    }
    return true;
  });

  const unreadCount = messages.filter(m => m.status === "unread").length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={22} className="text-indigo-400" /> Pesan Masuk
          </h1>
          <p className="text-sm text-white/40 mt-0.5">{unreadCount} pesan belum dibaca</p>
        </div>
        <button onClick={load} className="btn-glass text-[10px] uppercase tracking-wider px-3 py-1.5 flex items-center gap-2">
          <Loader2 size={12} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Cari nama, email, atau subjek..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all"
              style={{
                background: filter === f ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                color: filter === f ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${filter === f ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {f === "all" ? "Semua" : f === "unread" ? "Belum Dibaca" : "Sudah Dibaca"}
            </button>
          ))}
        </div>
      </div>

      {loading && messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-white/10" size={32} />
          <span className="text-xs text-white/20">Memproses pesan...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {filtered.length === 0 && (
              <div className="glass-card p-12 text-center" style={{ cursor: "default" }}>
                <Mail size={32} className="text-white/5 mx-auto mb-3" />
                <p className="text-xs text-white/20">Tidak ada pesan yang cocok</p>
              </div>
            )}
            {filtered.map(m => (
              <div
                key={m.id}
                onClick={() => { setSelected(m); if (m.status === "unread") markRead(m.id); }}
                className="glass-card p-4 flex items-start gap-3 group border border-white/5 hover:border-indigo-500/20 transition-all"
                style={{
                  cursor: "pointer",
                  background: selected?.id === m.id ? "rgba(99,102,241,0.05)" : undefined,
                  borderColor: selected?.id === m.id ? "rgba(99,102,241,0.3)" : undefined,
                }}
              >
                {m.status === "unread" && <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white truncate">{m.subject}</p>
                    <p className="text-[10px] text-white/20 flex-shrink-0">{new Date(m.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</p>
                  </div>
                  <p className="text-xs text-white/40 truncate mt-0.5">{m.name} <span className="opacity-50">&lt;{m.email}&gt;</span></p>
                  <p className="text-[10px] text-white/30 line-clamp-1 mt-1.5 font-light">{m.message}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteMsg(m.id); }} 
                  className="p-1.5 rounded-lg text-white/10 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="glass-card p-6 min-h-[400px] flex flex-col" style={{ cursor: "default" }}>
            {selected ? (
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-white">{selected.subject}</h2>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" style={{
                         background: selected.status === "unread" ? "rgba(99,102,241,0.1)" : "rgba(52,211,153,0.1)",
                         color: selected.status === "unread" ? "#818cf8" : "#34d399",
                         border: `1px solid ${selected.status === "unread" ? "rgba(99,102,241,0.2)" : "rgba(52,211,153,0.2)"}`
                      }}>
                        {selected.status}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{selected.name} &lt;{selected.email}&gt;</p>
                    <p className="text-[11px] text-white/25">Dikirim pada {new Date(selected.created_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-2 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-4 overflow-y-auto max-h-[400px]">
                  <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed selection:bg-indigo-500/30 font-light">
                    {selected.message}
                  </p>
                </div>
                <div className="flex gap-3">
                  <a 
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="flex-1 btn-solid text-xs justify-center py-2.5 rounded-xl"
                  >
                    <Mail size={14} className="mr-2" /> Balas via Email
                  </a>
                  <button 
                    onClick={() => deleteMsg(selected.id)}
                    className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                  <Mail size={32} className="text-white/20" />
                </div>
                <h3 className="text-sm font-medium text-white mb-1">Pilih Pesan</h3>
                <p className="text-xs text-white/50 max-w-[200px]">Klik pada daftar di samping untuk membaca isi pesan secara detail.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
