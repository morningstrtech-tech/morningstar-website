import type { Request, Response } from "express";
import { AnalyticsService } from "../services/analytics.service.js";
import { createHash } from "crypto";

// Helper to parse user agent
function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad/i.test(ua)) {
    if (/ipad|tablet/i.test(ua)) return "tablet";
    return "mobile";
  }
  return "desktop";
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome/i.test(ua) && !/chromium/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}

export class AnalyticsController {
  /** Public: track a page view */
  static async trackView(req: Request, res: Response) {
    try {
      const { path, referrer, sessionId } = req.body;
      if (!path) {
        return res.status(400).json({ error: "path is required" });
      }

      const ua = req.headers["user-agent"] || "";
      const ip = req.headers["x-forwarded-for"] || req.ip || "unknown";
      const ipHash = createHash("sha256").update(String(ip)).digest("hex").slice(0, 16);

      await AnalyticsService.trackPageView({
        path,
        referrer: referrer || req.headers.referer || "",
        userAgent: ua,
        ipHash,
        device: parseDevice(ua),
        browser: parseBrowser(ua),
        sessionId: sessionId || ipHash,
      });

      return res.status(200).json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get overview stats */
  static async getOverview(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const overview = await AnalyticsService.getOverview(days);
      return res.status(200).json(overview);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get daily views chart data */
  static async getDailyViews(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await AnalyticsService.getDailyViews(days);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get page stats */
  static async getPageStats(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await AnalyticsService.getPageStats(days);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get device breakdown */
  static async getDeviceStats(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await AnalyticsService.getDeviceStats(days);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get browser breakdown */
  static async getBrowserStats(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await AnalyticsService.getBrowserStats(days);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get referrer breakdown */
  static async getReferrerStats(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await AnalyticsService.getReferrerStats(days);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /** Admin: get recent views */
  static async getRecentViews(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const data = await AnalyticsService.getRecentViews(limit);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
