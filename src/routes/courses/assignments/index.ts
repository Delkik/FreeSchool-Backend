import { Router } from "express";
import assignmentRoutes from "./assignments.routes";

const router = Router({ mergeParams: true });

router.use("/", assignmentRoutes);

export default router;
