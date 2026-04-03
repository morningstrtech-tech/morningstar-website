import { createAuthClient } from "better-auth/react";

const BASE = (process.env.NEXT_PUBLIC_API_URL || "https://morningstar-website.vercel.app").trim().replace(/\/+$/, "");
export const authClient = createAuthClient({
  baseURL: BASE.endsWith("/api") ? `${BASE}/auth` : `${BASE}/api/auth`,
});

export const { signIn, signUp, signOut, useSession } = authClient;
