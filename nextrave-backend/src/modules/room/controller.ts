import { Request, Response } from "express";
import { AuthenticatedRequest } from "shared/types";
import { AuthenticationError } from "shared/errors";
import * as roomService from "./service";

interface CreateRoomBody {
  name: string;
  playbackDeviceId: string;
}

export async function handleCreateRoom(
  req: Request<{}, {}, CreateRoomBody>,
  res: Response
) {
  const { userId } = req as AuthenticatedRequest;
  if (!userId) throw new AuthenticationError();

  const { name, playbackDeviceId } = req.body;
  const room = await roomService.createRoom(userId, name, playbackDeviceId);

  res.status(201).json(room);
}

export async function handleJoinRoom(req: Request, res: Response) {
  const { userId } = req as AuthenticatedRequest;
  if (!userId) throw new AuthenticationError();

  const { inviteCode } = req.params;
  const room = await roomService.joinRoom(userId, inviteCode);

  res.status(200).json(room);
}

export async function handleLeaveRoom(req: Request, res: Response) {
  const { userId } = req as AuthenticatedRequest;
  if (!userId) throw new AuthenticationError();

  const { _ } = req.params;
  await roomService.leaveRoom(userId);

  res.status(204).send();
}
