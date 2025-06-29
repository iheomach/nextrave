import { Request, Response } from "express";

import * as authService from "./service";

export async function spotifyLogin(req: Request, res: Response) {
  const redirectUrl = authService.getSpotifyAuthUrl();
  res.redirect(redirectUrl);
}

export async function spotifyCallback(req: Request, res: Response) {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(400).send("No code provided");
      return;
    }

    const userData = await authService.handleSpotifyCallback(code as string);

    res.json(userData);
  } catch (err) {
    console.error("Error occured authenticating spotify user: ", err);
    res.status(500).send("Authentication failed");
  }
}
