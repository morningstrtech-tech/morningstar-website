import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

// Public: get all projects (for frontend)
projectRouter.get("/", ProjectController.getAll);
projectRouter.get("/:id", ProjectController.getById);

// Protected: CRUD
projectRouter.post("/", requireAdmin, ProjectController.create);
projectRouter.patch("/:id", requireAdmin, ProjectController.update);
projectRouter.delete("/:id", requireAdmin, ProjectController.delete);

export default projectRouter;
