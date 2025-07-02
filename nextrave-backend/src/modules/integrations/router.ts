import { Router } from "express";
import * as integrationsController from "./controller";

const router = Router();

router.get("/spotify/connect", integrationsController.spotifyLogin);
router.get("/spotify/connect/callback", integrationsController.spotifyCallback);

export default router;
