import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";

// Build dynamic trusted origins for auth
const trustedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://mstech.agency",
];
if (process.env.FRONTEND_URL) {
  trustedOrigins.push(process.env.FRONTEND_URL);
}
if (process.env.BETTER_AUTH_URL) {
  trustedOrigins.push(process.env.BETTER_AUTH_URL);
}

export const auth = betterAuth({
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
  trustedOrigins,
});
