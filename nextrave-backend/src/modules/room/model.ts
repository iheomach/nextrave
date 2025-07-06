import { Schema, model, Document, Types } from "mongoose";

export interface RoomSchema {
  name: string;
  inviteCode: string;
  playbackDeviceId: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomDocument extends RoomSchema, Document<Types.ObjectId> {}

const roomSchema = new Schema<RoomDocument>(
  {
    name: { type: String, required: true, trim: true },
    inviteCode: { type: String, required: true, unique: true, index: true },
    playbackDeviceId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Room = model<RoomDocument>("Room", roomSchema);
