import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth/auth.js";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session?.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    (req as any).user = session.user;
    (req as any).session = session.session;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session?.user || (session.user as any).role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admin access required" });
    }

    (req as any).user = session.user;
    (req as any).session = session.session;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
