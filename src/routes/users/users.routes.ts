import { Router } from "express";
import {
  createUser,
  getChildren,
  getUser,
  getUsers,
  updateUser,
} from "@controllers/users/users.controller";
import gradeRoutes from "./grades";
import documentRoutes from "./documents";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);

router.get("/:id", getUser);
router.put("/:id", updateUser);

router.get("/:id/children", getChildren);

router.use("/:id/grades", gradeRoutes);
router.use("/:id/documents", documentRoutes);

export default router;
