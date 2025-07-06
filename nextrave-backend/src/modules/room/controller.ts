import { Request, Response } from "express";

import { AuthenticatedRequest } from "shared/types";
import { AuthenticationError } from "shared/errors";

import * as roomService from "./service";

interface CreateRoomBody {
  name: string;
  playbackDeviceId: string;
}

interface JoinRoomBody {
  code: string;
}

export async function handleCreateRoom(
  req: Request<{}, {}, CreateRoomBody>,
  res: Response
) {
  const authReq = req as AuthenticatedRequest;

  const userId = authReq.userId;
  if (!userId) throw new AuthenticationError();

  const { name, playbackDeviceId } = req.body;

  const room = await roomService.createRoom(userId, name, playbackDeviceId);

  res.status(201).json(room);
}

export async function handleJoinRoom(
  req: Request<{}, {}, JoinRoomBody>,
  res: Response
) {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.userId;
  const { code } = req.body;

  const room = await roomService.joinRoom(userId, code);

  res.status(200).json(room);
}

export async function handleLeaveRoom(req: Request, res: Response) {
  const { userId } = req as AuthenticatedRequest;

  await roomService.leaveRoom(userId);

  res.status(200).json({ message: "Left room successfully" });
}
