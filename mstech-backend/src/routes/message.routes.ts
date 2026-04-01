import { Router } from "express";
import { MessageController } from "../controllers/message.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const messageRouter = Router();

// Public route: everyone can send a message
messageRouter.post("/", MessageController.createMessage);

// Protected routes: only logged-in admin can read/manage messages
messageRouter.get("/", requireAuth, MessageController.getAllMessages);
messageRouter.patch("/:id/read", requireAuth, MessageController.markAsRead);
messageRouter.delete("/:id", requireAuth, MessageController.deleteMessage);

export default messageRouter;
