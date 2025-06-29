import { Schema, model, Document, Types } from "mongoose";

export interface UserSchema {
  spotifyId: string;
  displayName: string;
  email?: string;
  profileImage: string;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  tokenExpiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends UserSchema, Document<Types.ObjectId> {}

const userSchema = new Schema<UserDocument>(
  {
    spotifyId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String },
    profileImage: { type: String, required: true },
    spotifyAccessToken: { type: String, required: true },
    spotifyRefreshToken: { type: String, required: true },
    tokenExpiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const User = model<UserDocument>("User", userSchema);
