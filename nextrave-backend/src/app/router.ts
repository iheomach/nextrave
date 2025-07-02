import { Router } from "express";

import config from "@config";
import { authenticateJWT } from "./middlewares";

import { authRouter } from "@auth";
import { integrationsRouter } from "@integrations";

const router = Router();

const apiPrefix = `/api/v${config.APP_VERSION}`;

router.use(`${apiPrefix}/auth`, authRouter);

// protected routes
router.use(authenticateJWT);
router.use(`${apiPrefix}/integrations`, integrationsRouter);

export default router;
