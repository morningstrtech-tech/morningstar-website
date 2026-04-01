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

    // Attach user to request for downstream usage
    (req as any).user = session.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
