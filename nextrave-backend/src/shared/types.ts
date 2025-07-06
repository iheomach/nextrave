import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export interface SpotifyProfile {
  id: string;
  display_name?: string;
  email?: string;
  images?: { url: string }[];
}

export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface TokenPayload {
  userId: string;
}

export interface UserDTO {
  id: string;
  displayName: string;
  email: string;
  profileImage: string;
  spotifyId?: string;
  authToken?: string;
  currentRoom?: {
    roomId: string;
    role: string;
  } | null;
}

export enum RoomRole {
  Host = "host",
  Participant = "participant",
}
