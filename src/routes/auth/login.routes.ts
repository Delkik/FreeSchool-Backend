import { Router } from "express";
import { login } from "@controllers/auth/login.controller";

const router = Router();

router.get("/", login);

export default router;