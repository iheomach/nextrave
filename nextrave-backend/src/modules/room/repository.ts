import { ClientSession } from "mongoose";
import { Room, RoomDocument, RoomSchema } from "./model";

export async function createRoom(
  data: Partial<RoomSchema>,
  session?: ClientSession
): Promise<RoomDocument> {
  const [room] = await Room.create([data], { session });
  return room;
}

export async function findByInviteCode(
  code: string,
  session?: ClientSession
): Promise<RoomDocument | null> {
  return Room.findOne({ inviteCode: code }).session(session ?? null);
}

export async function updateRoom(
  roomId: string,
  data: Partial<RoomSchema>,
  session?: ClientSession
): Promise<RoomDocument | null> {
  return Room.findByIdAndUpdate(roomId, data, { new: true, session });
}
