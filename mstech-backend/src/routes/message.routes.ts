import { Router } from "express";
import { MessageController } from "../controllers/message.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const messageRouter = Router();

// Public route: everyone can send a message
messageRouter.post("/", MessageController.createMessage);

// Protected routes: only logged-in admin can read/manage messages
messageRouter.get("/", requireAdmin, MessageController.getAllMessages);
messageRouter.patch("/:id/read", requireAdmin, MessageController.markAsRead);
messageRouter.delete("/:id", requireAdmin, MessageController.deleteMessage);

export default messageRouter;
