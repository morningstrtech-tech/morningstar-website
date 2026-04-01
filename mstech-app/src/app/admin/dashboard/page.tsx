"use client";

import { useEffect, useState } from "react";
import {
  Eye, Users, Monitor, Smartphone, Tablet, Globe, TrendingUp,
  BarChart3, Activity
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

type Overview = { totalViews: number; uniqueVisitors: number; todayViews: number; todayUnique: number };
type DailyData = { date: string; views: number; uniqueVisitors: number }[];
type PageStat = { path: string; views: number; uniqueVisitors: number }[];
type DeviceStat = { device: string; count: number }[];
type BrowserStat = { browser: string; count: number }[];
type ReferrerStat = { referrer: string; count: number }[];

function StatCard({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="glass-card p-5" style={{ cursor: "default" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{typeof value === "number" ? value.toLocaleString() : value}</p>
      <p className="text-xs text-white/40">{label}</p>
      {sub && <p className="text-[10px] text-white/25 mt-1">{sub}</p>}
    </div>
  );
}

function MiniBarChart({ data, maxVal }: { data: { label: string; value: number }[]; maxVal: number }) {
  return (
    <div className="flex items-end gap-[3px] h-24">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${d.label}: ${d.value}`}>
          <div
            className="w-full rounded-sm transition-all duration-500"
            style={{
              height: `${maxVal > 0 ? Math.max((d.value / maxVal) * 100, 4) : 4}%`,
              background: "linear-gradient(to top, rgba(99,102,241,0.6), rgba(99,102,241,0.2))",
              minHeight: 3,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-white/60">{label || "Unknown"}</span>
        <span className="text-white/40">{value}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

const deviceIcons: Record<string, any> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const barColors = ["#6366f1", "#34d399", "#fbbf24", "#f472b6", "#a78bfa", "#38bdf8", "#fb923c"];

export default function DashboardPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [daily, setDaily] = useState<DailyData>([]);
  const [pages, setPages] = useState<PageStat>([]);
  const [devices, setDevices] = useState<DeviceStat>([]);
  const [browsers, setBrowsers] = useState<BrowserStat>([]);
  const [referrers, setReferrers] = useState<ReferrerStat>([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [ov, dy, pg, dv, br, rf] = await Promise.all([
          apiClient.get<Overview>(`/api/analytics/overview?days=${days}`),
          apiClient.get<DailyData>(`/api/analytics/daily?days=${days}`),
          apiClient.get<PageStat>(`/api/analytics/pages?days=${days}`),
          apiClient.get<DeviceStat>(`/api/analytics/devices?days=${days}`),
          apiClient.get<BrowserStat>(`/api/analytics/browsers?days=${days}`),
          apiClient.get<ReferrerStat>(`/api/analytics/referrers?days=${days}`),
        ]);
        setOverview(ov);
        setDaily(dy);
        setPages(pg);
        setDevices(dv);
        setBrowsers(br);
        setReferrers(rf);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [days]);

  const maxDailyViews = daily.reduce((m, d) => Math.max(m, Number(d.views)), 0);
  const totalDevices = devices.reduce((s, d) => s + Number(d.count), 0);
  const totalBrowsers = browsers.reduce((s, b) => s + Number(b.count), 0);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-sm text-white/40 mt-0.5">Monitor trafik dan performa website</p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: days === d ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                color: days === d ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${days === d ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Activity size={28} className="text-white/20 animate-pulse" />
            <span className="text-xs text-white/30">Memuat data analytics...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon={Eye} label="Total Views" value={overview?.totalViews ?? 0} sub={`${days} hari terakhir`} color="#6366f1" />
            <StatCard icon={Users} label="Unique Visitors" value={overview?.uniqueVisitors ?? 0} sub={`${days} hari terakhir`} color="#34d399" />
            <StatCard icon={TrendingUp} label="Views Hari Ini" value={overview?.todayViews ?? 0} color="#fbbf24" />
            <StatCard icon={Globe} label="Visitor Hari Ini" value={overview?.todayUnique ?? 0} color="#f472b6" />
          </div>

          {/* Daily Chart */}
          <div className="glass-card p-6" style={{ cursor: "default" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Trafik Harian</h2>
                <p className="text-xs text-white/30 mt-0.5">{days} hari terakhir</p>
              </div>
              <BarChart3 size={18} className="text-white/20" />
            </div>
            {daily.length > 0 ? (
              <MiniBarChart
                data={daily.map((d) => ({ label: d.date, value: Number(d.views) }))}
                maxVal={maxDailyViews}
              />
            ) : (
              <div className="h-24 flex items-center justify-center text-xs text-white/20">
                Belum ada data trafik
              </div>
            )}
            {daily.length > 0 && (
              <div className="flex justify-between mt-2 text-[10px] text-white/20">
                <span>{daily[0]?.date}</span>
                <span>{daily[daily.length - 1]?.date}</span>
              </div>
            )}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top Pages */}
            <div className="glass-card p-5 lg:col-span-1" style={{ cursor: "default" }}>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={15} className="text-indigo-400" />
                Halaman Populer
              </h3>
              <div className="space-y-3">
                {pages.length > 0 ? pages.slice(0, 8).map((p, i) => (
                  <ProgressBar key={i} label={p.path} value={Number(p.views)} max={Number(pages[0]?.views ?? 1)} color={barColors[i % barColors.length]} />
                )) : (
                  <p className="text-xs text-white/20">Belum ada data</p>
                )}
              </div>
            </div>

            {/* Devices */}
            <div className="glass-card p-5" style={{ cursor: "default" }}>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Monitor size={15} className="text-emerald-400" />
                Perangkat
              </h3>
              <div className="space-y-3">
                {devices.length > 0 ? devices.map((d, i) => {
                  const DevIcon = deviceIcons[d.device || "desktop"] || Monitor;
                  const pct = totalDevices > 0 ? ((Number(d.count) / totalDevices) * 100).toFixed(1) : "0";
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <DevIcon size={16} className="text-white/30" />
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60 capitalize">{d.device || "Unknown"}</span>
                          <span className="text-white/40">{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColors[i % barColors.length] }} />
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-xs text-white/20">Belum ada data</p>
                )}
              </div>
            </div>

            {/* Browsers & Referrers */}
            <div className="glass-card p-5" style={{ cursor: "default" }}>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Globe size={15} className="text-amber-400" />
                Browser & Referrer
              </h3>
              <div className="space-y-3">
                {browsers.length > 0 ? browsers.slice(0, 4).map((b, i) => (
                  <ProgressBar key={`b-${i}`} label={b.browser || "Unknown"} value={Number(b.count)} max={Number(browsers[0]?.count ?? 1)} color={barColors[i % barColors.length]} />
                )) : (
                  <p className="text-xs text-white/20">Belum ada data browser</p>
                )}
              </div>
              {referrers.length > 0 && (
                <>
                  <div className="my-3" style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2">Top Referrer</p>
                  <div className="space-y-2">
                    {referrers.slice(0, 3).map((r, i) => (
                      <div key={`r-${i}`} className="flex justify-between text-xs">
                        <span className="text-white/50 truncate max-w-[180px]">{r.referrer}</span>
                        <span className="text-white/30">{Number(r.count)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
