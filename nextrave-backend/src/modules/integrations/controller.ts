import { Request, Response } from "express";

import { AuthenticatedRequest } from "shared/types";
import { AuthenticationError, ValidationError } from "shared/errors";

import * as authService from "./service";

export async function spotifyLogin(_: Request, res: Response) {
  const redirectUrl = authService.getSpotifyAuthUrl();
  res.redirect(redirectUrl);
}

export async function spotifyCallback(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;

  const userId = authReq.userId;
  if (!userId) throw new AuthenticationError("Unauthorized");

  const { code } = authReq.query;
  if (!code) throw new ValidationError("No code provided");

  const userData = await authService.handleSpotifyCallback(
    userId,
    code as string
  );
  res.json(userData);
}
