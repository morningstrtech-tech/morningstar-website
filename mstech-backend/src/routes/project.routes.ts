import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

// Public: get all projects (for frontend)
projectRouter.get("/", ProjectController.getAll);
projectRouter.get("/:id", ProjectController.getById);

// Protected: CRUD
projectRouter.post("/", requireAuth, ProjectController.create);
projectRouter.patch("/:id", requireAuth, ProjectController.update);
projectRouter.delete("/:id", requireAuth, ProjectController.delete);

export default projectRouter;
