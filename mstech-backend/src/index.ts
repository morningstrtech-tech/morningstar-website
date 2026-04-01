import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.js";
import rootRouter from "./routes/index.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Build dynamic CORS origins list
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://mstech.agency",
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // required for better-auth cookies
}));
app.use(express.json());

// Serving static files from uploads directory (local dev only, won't persist on Vercel)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 1. Better Auth Handler (Has to be plugged in first for Auth endpoints)
app.use("/api/auth", (req, res) => toNodeHandler(auth)(req, res));

// 2. Application API Routes
app.use("/api", rootRouter);

// 3. Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "mstech-backend is running." });
});

// Only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Backend is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
