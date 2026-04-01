import { Router } from "express";
import messageRouter from "./message.routes.js";
import projectRouter from "./project.routes.js";
import serviceRouter from "./service.routes.js";
import analyticsRouter from "./analytics.routes.js";
import uploadRouter from "./upload.routes.js";

import { auth } from "../auth/auth.js";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import { eq, sql } from "drizzle-orm";

const rootRouter = Router();

rootRouter.use("/messages", messageRouter);
rootRouter.use("/projects", projectRouter);
rootRouter.use("/services", serviceRouter);
rootRouter.use("/analytics", analyticsRouter);
rootRouter.use("/upload", uploadRouter);

// One-time Admin Setup Route
rootRouter.get("/admin/setup", async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(400).json({ error: "ADMIN_EMAIL and ADMIN_PASSWORD env vars are not set." });
    }

    console.log(`Resetting & Setting up admin: ${adminEmail}`);

    // Clean up existing user if any (to make sure password & role match)
    const existing = await db.query.user.findFirst({
        where: eq(user.email, adminEmail)
    });

    if (existing) {
        console.log("Existing user found, removing old data...");
        // Delete from account table first due to FK
        await db.execute(sql`DELETE FROM "account" WHERE "userId" = ${existing.id}`);
        await db.delete(user).where(eq(user.id, existing.id));
    }

    // Now Sign Up Fresh
    await auth.api.signUpEmail({
        body: {
            email: adminEmail,
            password: adminPassword,
            name: "MS.Tech Admin",
        },
    });

    // Promotion
    await db.update(user)
      .set({ role: 'admin' })
      .where(eq(user.email, adminEmail));

    return res.json({ 
        success: true,
        message: "Admin Account Freshly Created & Promoted!", 
        email: adminEmail,
        notice: "Silakan login sekarang."
    });
  } catch (error: any) {
    console.error("Admin setup failed:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default rootRouter;
