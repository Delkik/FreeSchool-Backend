import { Router } from "express";
import loginRoutes from "./login.routes";
import signUpRoutes from './signup.routes'

const router = Router();

router.use("/login", loginRoutes);
router.use('/signup', signUpRoutes);

export default router; 