import { pgTable, text, timestamp, boolean, jsonb, uuid, integer, serial, index } from 'drizzle-orm/pg-core';

// ==========================================
// Better Auth Tables
// ==========================================
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  role: text('role').default('user').notNull(), // 'user' | 'admin'
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull()
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id)
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull()
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt')
});

// ==========================================
// App: Messages (Contact Form)
// ==========================================
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('unread').notNull(), // 'unread' | 'read'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ==========================================
// App: Portfolio Projects 
// ==========================================
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  image: text('image'),
  desc: text('desc').notNull(),
  descEn: text('desc_en'),
  techStack: jsonb('tech_stack').$type<string[]>(), // ["Next.js", "Tailwind"]
  url: text('url'),
  isLive: boolean('is_live').default(false).notNull(),
  glowColor: text('glow_color').default('glass-card-glow-blue'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==========================================
// App: Services / Packages
// ==========================================
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),         // "Paket UMKM"
  nameEn: text('name_en'),              // "SME Package"
  image: text('image'),
  price: text('price').notNull(),       // "Rp 1.5 — 3 Juta"
  priceNote: text('price_note'),        // "Tergantung kompleksitas"
  badge: text('badge'),                 // "Populer"
  desc: text('desc'),
  descEn: text('desc_en'),
  features: jsonb('features').$type<string[]>(),
  isPopular: boolean('is_popular').default(false).notNull(),
  isComingSoon: boolean('is_coming_soon').default(false).notNull(),
  glowColor: text('glow_color').default('glass-card-glow-blue'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==========================================
// Analytics: Page Views
// ==========================================
export const pageViews = pgTable('page_views', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),              // "/", "/services", "/contact"
  referrer: text('referrer'),                // where they came from
  userAgent: text('user_agent'),
  ipHash: text('ip_hash'),                   // hashed IP for privacy
  country: text('country'),
  device: text('device'),                    // "desktop" | "mobile" | "tablet"
  browser: text('browser'),
  sessionId: text('session_id'),             // anonymous session tracking
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_pageviews_path').on(table.path),
  index('idx_pageviews_created').on(table.createdAt),
  index('idx_pageviews_session').on(table.sessionId),
]);

// ==========================================
// Analytics: Daily Aggregated Stats
// ==========================================
export const dailyStats = pgTable('daily_stats', {
  id: serial('id').primaryKey(),
  date: text('date').notNull().unique(),     // "2026-04-01"
  totalViews: integer('total_views').default(0).notNull(),
  uniqueVisitors: integer('unique_visitors').default(0).notNull(),
  topPage: text('top_page'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
