import { Router } from "express";
import { ServiceController } from "../controllers/service.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const serviceRouter = Router();

// Public: get all services (for frontend)
serviceRouter.get("/", ServiceController.getAll);
serviceRouter.get("/:id", ServiceController.getById);

// Protected: CRUD
serviceRouter.post("/", requireAuth, ServiceController.create);
serviceRouter.patch("/:id", requireAuth, ServiceController.update);
serviceRouter.delete("/:id", requireAuth, ServiceController.delete);

export default serviceRouter;
