import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";

export const auth = betterAuth({
  baseURL: "https://morningstar-website.vercel.app",
  database: drizzleAdapter(db, {
    provider: "pg", // Postgres
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    // Memungkinkan session menyeberang antar domain (jade ke morningstar)
    // @ts-ignore
    useCrossSiteCookies: true,
  },
  trustedOrigins: [
    "http://localhost:3000", 
    "http://localhost:5000", 
    "https://mstech.agency", 
    "https://morningstar-website.vercel.app",
    "https://mstech-jade.vercel.app",
    "https://morningstar-website-jarozayn-7118s-projects.vercel.app"
  ],
});
