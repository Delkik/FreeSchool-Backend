import { Router } from "express";
import {
  createUser,
  getChildren,
  getUser,
  getUsers,
  updateUser,
} from "@controllers/users/users.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);

router.get("/:id", getUser);
router.put("/:id", updateUser);

router.get("/:id/children", getChildren);

export default router;
