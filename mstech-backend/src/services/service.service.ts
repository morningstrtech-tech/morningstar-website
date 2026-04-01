import { db } from "../db/index.js";
import { services } from "../db/schema.js";
import { eq, desc, asc } from "drizzle-orm";

export class ServicePackageService {
  static async create(data: {
    name: string;
    nameEn?: string;
    image?: string;
    price: string;
    priceNote?: string;
    badge?: string;
    desc?: string;
    descEn?: string;
    features?: string[];
    isPopular?: boolean;
    isComingSoon?: boolean;
    glowColor?: string;
    sortOrder?: number;
  }) {
    const result = await db.insert(services).values(data).returning();
    return result[0];
  }

  static async findAll() {
    return await db.select().from(services).orderBy(asc(services.sortOrder), desc(services.createdAt));
  }

  static async findById(id: string) {
    const result = await db.select().from(services).where(eq(services.id, id));
    return result[0] || null;
  }

  static async update(id: string, data: Partial<{
    name: string;
    nameEn: string;
    image: string;
    price: string;
    priceNote: string;
    badge: string;
    desc: string;
    descEn: string;
    features: string[];
    isPopular: boolean;
    isComingSoon: boolean;
    glowColor: string;
    sortOrder: number;
  }>) {
    const result = await db
      .update(services)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  static async delete(id: string) {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result[0];
  }
}
