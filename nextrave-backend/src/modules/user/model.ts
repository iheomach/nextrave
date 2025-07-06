import { Schema, model, Document, Types } from "mongoose";

import { RoomRole } from "shared/types";

export interface CurrentRoom {
  roomId: Types.ObjectId;
  role: string;
}

export interface UserSchema {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  spotifyId?: string;
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
  spotifyTokenExpiresAt?: Date;
  currentRoom?: CurrentRoom | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends UserSchema, Document<Types.ObjectId> {}

const currentRoomSchema = new Schema<CurrentRoom>({
  roomId: { type: Schema.Types.ObjectId, ref: "Room", default: null },
  role: {
    type: String,
    enum: Object.values(RoomRole) as string[],
    default: RoomRole.Participant,
  },
});

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    profileImage: { type: String, required: true },
    spotifyId: { type: String, unique: true },
    spotifyAccessToken: { type: String },
    spotifyRefreshToken: { type: String },
    spotifyTokenExpiresAt: { type: Date },
    currentRoom: { type: currentRoomSchema, default: null },
  },
  { timestamps: true }
);

export const User = model<UserDocument>("User", userSchema);
