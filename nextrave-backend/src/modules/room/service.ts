import crypto from "crypto";

import { NotFoundError, ValidationError } from "shared/errors";
import { RoomRole } from "shared/types";
import { withTransaction } from "shared/utils";

import { userService } from "@user";

import * as roomRepository from "./repository";
import { RoomDocument } from "./model";

export async function createRoom(
  name: string,
  playbackDeviceId: string,
  userId: string
) {
  return withTransaction(async session => {
    const user = await userService.getUser(userId, false, session);
    if (!user) throw new NotFoundError("User not found");
    if (!user.spotifyId)
      throw new ValidationError("User not connected to Spotify");

    const inviteCode = generateInviteCode();

    const room = await roomRepository.createRoom(
      {
        name,
        inviteCode,
        playbackDeviceId,
      },
      session
    );

    await userService.updateUserCurrentRoom(
      userId,
      room.id.toString(),
      RoomRole.Host,
      session
    );

    return room;
  });
}

export async function joinRoom(userId: string, code: string) {
  const room: RoomDocument | null = await roomRepository.findByInviteCode(code);
  if (!room || !room.isActive) throw new NotFoundError("Room not found");

  await userService.updateUserCurrentRoom(
    userId,
    room._id.toString(),
    RoomRole.Participant
  );

  return room;
}

export async function leaveRoom(userId: string) {
  const user = await userService.getUser(userId);
  const roomInfo = user.currentRoom;
  if (!roomInfo?.roomId) throw new NotFoundError("User is not in a room");

  const { roomId, role } = roomInfo;

  if (role === RoomRole.Host) {
    await closeRoom(roomId.toString());
  }

  await userService.clearUserRoom(userId);
}

async function closeRoom(roomId: string) {
  await roomRepository.updateRoom(roomId, { isActive: false });
}

function generateInviteCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}
