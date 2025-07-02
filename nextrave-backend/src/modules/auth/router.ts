import { Router } from "express";
import * as authController from "./controller";

const router = Router();

router.post("/login", authController.handleLogin);
router.post("/signup", authController.handleSignup);

export default router;
