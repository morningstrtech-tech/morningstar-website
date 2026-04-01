import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const analyticsRouter = Router();

// Public: track page views (called from frontend)
analyticsRouter.post("/track", AnalyticsController.trackView);

// Protected: admin analytics endpoints
analyticsRouter.get("/overview", requireAuth, AnalyticsController.getOverview);
analyticsRouter.get("/daily", requireAuth, AnalyticsController.getDailyViews);
analyticsRouter.get("/pages", requireAuth, AnalyticsController.getPageStats);
analyticsRouter.get("/devices", requireAuth, AnalyticsController.getDeviceStats);
analyticsRouter.get("/browsers", requireAuth, AnalyticsController.getBrowserStats);
analyticsRouter.get("/referrers", requireAuth, AnalyticsController.getReferrerStats);
analyticsRouter.get("/recent", requireAuth, AnalyticsController.getRecentViews);

export default analyticsRouter;
