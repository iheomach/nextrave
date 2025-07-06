import { Router } from "express";

import * as roomController from "./controller";

const router = Router();

router.post("/rooms", roomController.handleCreateRoom);
router.post("/rooms/:inviteCode/members", roomController.handleJoinRoom);
router.post("/rooms/:roomId/members/me", roomController.handleLeaveRoom);

export default router;
