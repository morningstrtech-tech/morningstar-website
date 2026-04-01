import { Router } from "express";
import { ServiceController } from "../controllers/service.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const serviceRouter = Router();

// Public: get all services (for frontend)
serviceRouter.get("/", ServiceController.getAll);
serviceRouter.get("/:id", ServiceController.getById);

// Protected: CRUD
serviceRouter.post("/", requireAdmin, ServiceController.create);
serviceRouter.patch("/:id", requireAdmin, ServiceController.update);
serviceRouter.delete("/:id", requireAdmin, ServiceController.delete);

export default serviceRouter;
