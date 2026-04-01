import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { eq, desc, asc } from "drizzle-orm";

export class ProjectService {
  static async create(data: {
    name: string;
    category: string;
    image?: string;
    desc: string;
    descEn?: string;
    techStack?: string[];
    url?: string;
    isLive?: boolean;
    glowColor?: string;
    sortOrder?: number;
  }) {
    const result = await db.insert(projects).values(data).returning();
    return result[0];
  }

  static async findAll() {
    return await db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }

  static async findById(id: string) {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0] || null;
  }

  static async update(id: string, data: Partial<{
    name: string;
    category: string;
    image: string;
    desc: string;
    descEn: string;
    techStack: string[];
    url: string;
    isLive: boolean;
    glowColor: string;
    sortOrder: number;
  }>) {
    const result = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }

  static async delete(id: string) {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result[0];
  }
}
