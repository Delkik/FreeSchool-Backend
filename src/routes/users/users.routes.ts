import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "@controllers/users/users.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);

router.get("/:id", getUser);
router.put("/:id", updateUser);

export default router;
