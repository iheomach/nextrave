import { Schema, model, Document, Types } from "mongoose";

export interface UserSchema {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  spotifyId?: string;
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
  spotifyTokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends UserSchema, Document<Types.ObjectId> {}

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
  },
  { timestamps: true }
);

export const User = model<UserDocument>("User", userSchema);
