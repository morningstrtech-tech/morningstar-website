"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { apiClient, API_URL } from "../../lib/api-client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await apiClient.upload<{ url: string }>("/api/upload", formData);
      onChange(data.url);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Gagal mengunggah gambar");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearImage = () => {
    onChange("");
    setError(null);
  };

  // Convert relative URL from backend to absolute for preview
  const previewUrl = value 
    ? (value.startsWith("http") ? value : `${API_URL}${value}`)
    : null;

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>}
      
      <div className="relative group">
        {previewUrl ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                title="Ganti Gambar"
              >
                <Upload size={18} />
              </button>
              <button 
                onClick={clearImage}
                className="p-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/40 transition-all"
                title="Hapus Gambar"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full aspect-video rounded-xl border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-2 text-white/30 hover:text-white/60 group"
          >
            {uploading ? (
              <>
                <Loader2 size={24} className="animate-spin text-indigo-400" />
                <span className="text-xs font-medium">Mengunggah...</span>
              </>
            ) : (
              <>
                <div className="p-3 rounded-full bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <ImageIcon size={24} />
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold block">Klik untuk Unggah Gambar</span>
                  <span className="text-[10px] opacity-60">PNG, JPG, WEBP (Maks 5MB)</span>
                </div>
              </>
            )}
          </button>
        )}

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-red-400 text-[10px] mt-1 px-1">
          <AlertCircle size={12} />
          {error}
        </div>
      )}

      {/* Manual Input for backward compatibility or direct URLs */}
      <div className="relative mt-2">
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder || "Atau masukkan URL gambar..."} 
          className="w-full px-3 py-2 rounded-lg text-[10px] text-white/40 bg-white/5 border border-white/5 outline-none focus:border-white/10 transition-all" 
        />
      </div>
    </div>
  );
}
