import type { Request, Response } from "express";
import { MessageService } from "../services/message.service.js";

export class MessageController {
  static async createMessage(req: Request, res: Response) {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newMessage = await MessageService.create({ name, email, subject, message });
      return res.status(201).json(newMessage);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  static async getAllMessages(req: Request, res: Response) {
    try {
      const msgs = await MessageService.findAll();
      return res.status(200).json(msgs);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await MessageService.updateStatus(id as string, "read");
      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  static async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await MessageService.delete(id as string);
      if (!deleted) return res.status(404).json({ error: "Message not found" });
      return res.status(200).json(deleted);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
