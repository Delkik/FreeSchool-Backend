import { Router } from "express";
import courseRoutes from "./grades.routes";

const router = Router({ mergeParams: true });

router.use("/", courseRoutes);

export default router;
