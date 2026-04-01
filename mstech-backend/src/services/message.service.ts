import { db } from "../db/index.js";
import { messages } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

export class MessageService {
  static async create(data: { name: string; email: string; subject: string; message: string }) {
    const result = await db.insert(messages).values(data).returning();
    return result[0];
  }

  static async findAll() {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  static async updateStatus(id: string, status: "unread" | "read") {
    const result = await db.update(messages).set({ status }).where(eq(messages.id, id)).returning();
    return result[0];
  }

  static async delete(id: string) {
    const result = await db.delete(messages).where(eq(messages.id, id)).returning();
    return result[0];
  }
}
