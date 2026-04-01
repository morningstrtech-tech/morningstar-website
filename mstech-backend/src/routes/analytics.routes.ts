import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const analyticsRouter = Router();

// Public: track page views (called from frontend)
analyticsRouter.post("/track", AnalyticsController.trackView);

// Protected: admin analytics endpoints
analyticsRouter.get("/overview", requireAdmin, AnalyticsController.getOverview);
analyticsRouter.get("/daily", requireAdmin, AnalyticsController.getDailyViews);
analyticsRouter.get("/pages", requireAdmin, AnalyticsController.getPageStats);
analyticsRouter.get("/devices", requireAdmin, AnalyticsController.getDeviceStats);
analyticsRouter.get("/browsers", requireAdmin, AnalyticsController.getBrowserStats);
analyticsRouter.get("/referrers", requireAdmin, AnalyticsController.getReferrerStats);
analyticsRouter.get("/recent", requireAdmin, AnalyticsController.getRecentViews);

export default analyticsRouter;
