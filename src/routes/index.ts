import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import courseRoutes from "./courses";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/courses", courseRoutes);

export default router;
