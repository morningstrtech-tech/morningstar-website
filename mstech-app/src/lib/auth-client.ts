import { createAuthClient } from "better-auth/react";

const BASE = ""; // Unified deployment: everything is in one house now!
export const authClient = createAuthClient({
  baseURL: BASE.endsWith("/api") ? `${BASE}/auth` : `${BASE}/api/auth`,
});

export const { signIn, signUp, signOut, useSession } = authClient;
