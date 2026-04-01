"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getSessionId() {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("mstech_sid");
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("mstech_sid", sid);
  }
  return sid;
}

export default function PageTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;
    // Don't double-track
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    const track = async () => {
      try {
        await fetch(`${API}/api/analytics/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || "",
            sessionId: getSessionId(),
          }),
        });
      } catch {
        // Silent fail — analytics should never break the site
      }
    };

    // Small delay to not block page render
    const t = setTimeout(track, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
