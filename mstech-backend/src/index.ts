import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.js";
import { db } from "./db/index.js";
import { user } from "./db/schema.js";
import { eq } from "drizzle-orm";
import rootRouter from "./routes/index.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 5000;

// @ts-ignore
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, 
}));
app.use(cors({
  origin: (origin, callback) => {
    // Allow if no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const allowedPatterns = [
      /^http:\/\/localhost:300\d$/, // localhost:3000-3009
      /^https:\/\/.*\.vercel\.app$/, // any vercel subdomain
      "https://mstech.agency"         // production domain
    ];

    const isAllowed = allowedPatterns.some(pattern => {
      if (typeof pattern === "string") return pattern === origin;
      return pattern.test(origin);
    });

    if (isAllowed || origin === process.env.ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // required for better-auth cookies
}));
app.use(express.json());

// Serving static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 1. Better Auth Handler
app.all("/api/auth/*", (req, res) => toNodeHandler(auth)(req, res));

// 2. Application API Routes
app.use("/api", rootRouter);

// 3. Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "mstech-backend is running." });
});

// Only listen if not in serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Backend is running on http://localhost:${PORT}`);
  });
}

export default app;
