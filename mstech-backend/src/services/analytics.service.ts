import { db } from "../db/index.js";
import { pageViews, dailyStats } from "../db/schema.js";
import { eq, desc, sql, gte, and, count } from "drizzle-orm";

export class AnalyticsService {
  /** Record a page view */
  static async trackPageView(data: {
    path: string;
    referrer?: string;
    userAgent?: string;
    ipHash?: string;
    device?: string;
    browser?: string;
    sessionId?: string;
    country?: string;
  }) {
    const result = await db.insert(pageViews).values(data).returning();
    return result[0];
  }

  /** Get overview stats for the dashboard */
  static async getOverview(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    // Total page views in period
    const totalViewsResult = await db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since));

    // Unique visitors (by sessionId)
    const uniqueVisitorsResult = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})` })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since));

    // Today's views
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayViewsResult = await db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, today));

    // Today's unique
    const todayUniqueResult = await db
      .select({ count: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})` })
      .from(pageViews)
      .where(gte(pageViews.createdAt, today));

    return {
      totalViews: Number(totalViewsResult[0]?.count ?? 0),
      uniqueVisitors: Number(uniqueVisitorsResult[0]?.count ?? 0),
      todayViews: Number(todayViewsResult[0]?.count ?? 0),
      todayUnique: Number(todayUniqueResult[0]?.count ?? 0),
    };
  }

  /** Get views per page */
  static async getPageStats(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const result = await db
      .select({
        path: pageViews.path,
        views: count(),
        uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.path)
      .orderBy(sql`count(*) DESC`);

    return result;
  }

  /** Get daily view counts for chart */
  static async getDailyViews(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const result = await db
      .select({
        date: sql<string>`TO_CHAR(${pageViews.createdAt}, 'YYYY-MM-DD')`,
        views: count(),
        uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(sql`TO_CHAR(${pageViews.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`TO_CHAR(${pageViews.createdAt}, 'YYYY-MM-DD')`);

    return result;
  }

  /** Get device breakdown */
  static async getDeviceStats(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const result = await db
      .select({
        device: pageViews.device,
        count: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.device)
      .orderBy(sql`count(*) DESC`);

    return result;
  }

  /** Get browser breakdown */
  static async getBrowserStats(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const result = await db
      .select({
        browser: pageViews.browser,
        count: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.browser)
      .orderBy(sql`count(*) DESC`);

    return result;
  }

  /** Get referrer breakdown */
  static async getReferrerStats(days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const result = await db
      .select({
        referrer: pageViews.referrer,
        count: count(),
      })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, since), sql`${pageViews.referrer} IS NOT NULL AND ${pageViews.referrer} != ''`))
      .groupBy(pageViews.referrer)
      .orderBy(sql`count(*) DESC`)
      .limit(10);

    return result;
  }

  /** Get recent page views */
  static async getRecentViews(limit: number = 50) {
    return await db
      .select()
      .from(pageViews)
      .orderBy(desc(pageViews.createdAt))
      .limit(limit);
  }
}
