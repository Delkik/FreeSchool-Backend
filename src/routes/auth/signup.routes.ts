import { Router } from "express";
import { confirmSignUp, signup } from "@controllers/auth/signup.controller";

const router = Router();

router.post("/", signup);
router.post("/confirm", confirmSignUp);

export default router;
