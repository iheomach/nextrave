import { Router } from "express";

import config from "shared/config";
import { authenticateJWT, errorHandler } from "./middlewares";

import { authRouter } from "@auth";
import { roomRouter } from "modules/room";
import { integrationsRouter } from "@integrations";

const router = Router();

const apiPrefix = `/api/v${config.APP_VERSION}`;

router.use(`${apiPrefix}/auth`, authRouter);

// protected routes
router.use(`${apiPrefix}/integrations`, authenticateJWT, integrationsRouter);

router.use(errorHandler);

export default router;
