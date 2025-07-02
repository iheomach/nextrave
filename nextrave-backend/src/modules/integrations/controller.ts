import { Request, Response } from "express";

import * as authService from "./service";
import { AuthenticatedRequest } from "@types";

export async function spotifyLogin(_: Request, res: Response) {
  const redirectUrl = authService.getSpotifyAuthUrl();
  res.redirect(redirectUrl);
}

export async function spotifyCallback(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;

  const userId = authReq.userId;
  if (!userId) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { code } = authReq.query;
  if (!code) {
    res.status(400).send("No code provided");
    return;
  }

  try {
    const userData = await authService.handleSpotifyCallback(
      userId,
      code as string
    );
    res.json(userData);
  } catch (err) {
    console.error("Error occurred authenticating spotify user: ", err);
    res.status(500).send("Authentication failed");
  }
}
