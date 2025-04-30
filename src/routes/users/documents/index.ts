import { Router } from "express";
import documentRoutes from "./documents.routes";

const router = Router({ mergeParams: true });

router.use("/", documentRoutes);

export default router;
