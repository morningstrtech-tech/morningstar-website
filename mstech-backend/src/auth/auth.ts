import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";

export const auth = betterAuth({
  baseURL: "https://mstech-jade.vercel.app",
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
    // Session no longer needs to cross domains as they are unified in one Vercel project
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://mstech-jade.vercel.app",
    "https://mstech.agency"
  ],
});
