import { Router } from "express";
import * as authController from "./controller";

const router = Router();

router.get("/login", authController.spotifyLogin);
router.get("/callback", authController.spotifyCallback);

export default router;
