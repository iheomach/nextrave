import { Router } from "express";
import * as roomController from "./controller";

const router = Router();

router.post("/rooms", roomController.handleCreateRoom);
router.post("/rooms/join", roomController.handleJoinRoom);
router.post("/room/leave", roomController.handleLeaveRoom);

export default router;
