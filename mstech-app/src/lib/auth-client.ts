import { createAuthClient } from "better-auth/react";

const BASE = process.env.NEXT_PUBLIC_URL || (typeof window !== "undefined" ? window.location.origin : "");
export const authClient = createAuthClient({
  baseURL: BASE ? (BASE.endsWith("/api/auth") ? BASE : `${BASE}/api/auth`) : "/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;
