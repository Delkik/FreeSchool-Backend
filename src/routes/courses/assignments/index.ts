import { Router } from "express";
import assignmentRoutes from "./assignments.routes";

const router = Router();

router.use("/", assignmentRoutes);

export default router;
