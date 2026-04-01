import { Router } from "express";
import messageRouter from "./message.routes.js";
import projectRouter from "./project.routes.js";
import serviceRouter from "./service.routes.js";
import analyticsRouter from "./analytics.routes.js";
import uploadRouter from "./upload.routes.js";

const rootRouter = Router();

rootRouter.use("/messages", messageRouter);
rootRouter.use("/projects", projectRouter);
rootRouter.use("/services", serviceRouter);
rootRouter.use("/analytics", analyticsRouter);
rootRouter.use("/upload", uploadRouter);

export default rootRouter;
