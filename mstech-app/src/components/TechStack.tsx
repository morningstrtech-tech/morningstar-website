"use client";

import { useState } from "react";

// ─── SVG Icons ───────────────────────────────────────────────
const HTMLIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.071-.999.07-.999-11.63-.001.3 3.714h7.969l-.37 3.885-2.787.922-2.721-.922-.186-2.268H6.93l.36 4.489 4.69 1.685 4.644-1.556.667-7.235H8.531z" />
  </svg>
);
const CSSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622h10.125l-.255 2.716H8.471l.22 2.716h6.388l-.348 3.795-2.728.937-2.771-.937-.182-2.178H6.38l.353 4.474 5.23 1.834 5.247-1.706.674-7.57H9.56l-.233-2.716h9.605l.262-2.938z" />
  </svg>
);
const JSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
  </svg>
);
const NextIcon = () => (
  <svg viewBox="0 0 180 180" fill="currentColor" className="w-5 h-5">
    <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="#fff" /></mask>
    <g mask="url(#a)"><circle cx="90" cy="90" r="87" stroke="currentColor" strokeWidth="6" fill="none" /><path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 009.509-7.325z" /><rect x="115" y="54" width="12" height="72" /></g>
  </svg>
);
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <circle cx="12" cy="11.245" r="2.25" />
    <path d="M12 6.3c-1.3 0-2.8.2-4.3.7C5.8 7.6 4.2 8.4 3.2 9.4c-.9.8-1.3 1.5-1.3 2.1 0 1.3 1.7 2.8 4.4 3.6l.4.1c.3-.9.7-1.9 1.2-2.9-.5-1-.9-2-1.2-2.9l-.4.1c-1.5.4-2.5.9-3.1 1.3.7-.4 1.7-.9 3.1-1.3 1.5-.5 3-.7 4.3-.7s2.8.2 4.3.7c1.4.4 2.4.9 3.1 1.3-.6-.4-1.6-.9-3.1-1.3-1.5-.5-3-.7-4.3-.7z" fill="none" />
    <ellipse cx="12" cy="11.5" rx="10.5" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="12" cy="11.5" rx="10.5" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 11.5)" />
    <ellipse cx="12" cy="11.5" rx="10.5" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 11.5)" />
  </svg>
);
const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);
const ExpressIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.511 4.86 3.556-4.86a1.471 1.471 0 011.857-.667L17.5 10.87l5.013 6.92a1.529 1.529 0 01-1.513.798zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.139-.67zM1.116 10.77h9.665c-.081-2.87-1.814-4.877-4.3-4.986-2.81-.123-4.985 1.905-5.365 4.986z" />
  </svg>
);
const DrizzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5.353 11.823a1.036 1.036 0 00-.395 1.412l3.3 5.723a1.037 1.037 0 001.795-1.036l-3.3-5.723a1.036 1.036 0 00-1.4-.376z" opacity=".5" />
    <path d="M13.553 5.103a1.037 1.037 0 00-.395 1.413l3.3 5.723a1.037 1.037 0 001.795-1.037l-3.3-5.723a1.036 1.036 0 00-1.4-.376z" />
    <path d="M5.353 5.103a1.036 1.036 0 00-.395 1.413l3.3 5.723a1.037 1.037 0 001.795-1.037l-3.3-5.723a1.036 1.036 0 00-1.4-.376z" />
    <path d="M13.553 11.823a1.037 1.037 0 00-.395 1.412l3.3 5.723a1.037 1.037 0 001.795-1.036l-3.3-5.723a1.036 1.036 0 00-1.4-.376z" opacity=".5" />
  </svg>
);
const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879s.69 2.783 1.193 4.152c.503 1.37 1.054 2. 1.76 3.15 0.708 9.60 1.39 1.58 2.22 1.67.6.07 1.24-.18 1.79-.68l.017.007c.424.36.946.548 1.478.548.536 0 1.063-.192 1.484-.56.098.043.202.078.31.107.266.068.55.103.836.103a3.3 3.3 0 001.14-.2c.039.481.081.91.135 1.246.1.625.26 1.27.63 1.8.37.53.93.88 1.65.96.468.053.94-.06 1.34-.29.4-.23.71-.56.94-.89.47-.68.76-1.5.98-2.34.13-.49.21-.93.26-1.26l.56-.08c.77-.12 1.47-.39 2.03-.85.56-.46.98-1.1 1.15-1.92.17-.82.06-1.8-.24-2.94-.37-1.38-.53-2.15-.6-2.64l-.01-.07a9.7 9.7 0 00.08-.63 9.732 9.732 0 00-.378-4.097C22.202 1.333 20.27.075 17.128 0z" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
const SupabaseIcon = () => (
  <svg viewBox="0 0 109 113" fill="none" className="w-5 h-5">
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#sb-a)" />
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#sb-b)" fillOpacity=".2" />
    <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072z" fill="currentColor" opacity=".7" />
    <defs><linearGradient id="sb-a" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse"><stop stopColor="currentColor" stopOpacity=".6" /><stop offset="1" stopColor="currentColor" /></linearGradient><linearGradient id="sb-b" x1="36.156" y1="30.578" x2="54.484" y2="72.263" gradientUnits="userSpaceOnUse"><stop /><stop offset="1" stopOpacity="0" /></linearGradient></defs>
  </svg>
);
const VercelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1L24 22H0L12 1z" />
  </svg>
);
const BetterAuthIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /><circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

// ─── Tech Stack Data ─────────────────────────────────────────
const techRows = [
  {
    label: "Frontend",
    items: [
      { name: "HTML", icon: HTMLIcon },
      { name: "CSS", icon: CSSIcon },
      { name: "JavaScript", icon: JSIcon },
      { name: "React", icon: ReactIcon },
      { name: "Next.js", icon: NextIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
    ],
  },
  {
    label: "Backend & Data",
    items: [
      { name: "Express.js", icon: ExpressIcon },
      { name: "Drizzle ORM", icon: DrizzleIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
      { name: "Supabase", icon: SupabaseIcon },
      { name: "Better Auth", icon: BetterAuthIcon },
      { name: "Vercel", icon: VercelIcon },
    ],
  },
];

// ─── TechPill Component ──────────────────────────────────────
function TechPill({ name, icon: Icon }: { name: string; icon: () => React.JSX.Element }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative group/pill">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setTimeout(() => setHovered(false), 1500)}
        className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] group-hover/pill:bg-white/[0.08] ring-1 ring-white/[0.05] group-hover/pill:ring-white/[0.15] transition-all duration-300 cursor-default"
      >
        <span
          className="flex items-center justify-center text-white/30 group-hover/pill:text-white/80 transition-all duration-300 group-hover/pill:scale-110"
        >
          <Icon />
        </span>
      </button>

      {/* Premium Tooltip — Floating & Glassmorphic */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white/90 whitespace-nowrap pointer-events-none transition-all duration-300 z-50 ${hovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
          }`}
      >
        <div className="relative z-10">{name}</div>
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-black/80" />
      </div>
    </div>
  );
}

// ─── TechStack Export ────────────────────────────────────────
export default function TechStack() {
  return (
    <div className="mx-auto mt-20 max-w-5xl animate-fade-slide delay-600">
      <p className="text-xs text-white/30 text-center mb-8 uppercase tracking-widest">Teknologi yang kami gunakan</p>
      <div className="space-y-4">
        {techRows.map((row) => (
          <div key={row.label} className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-white/20 uppercase tracking-wider font-medium">{row.label}</span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {row.items.map((tech) => (
                <TechPill key={tech.name} name={tech.name} icon={tech.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
