import { Router } from "express";
import coursesRoutes from "./courses.routes";

const router = Router();

router.use("/", coursesRoutes);

export default router;
