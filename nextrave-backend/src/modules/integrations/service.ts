import axios from "axios";
import querystring from "querystring";
import jwt from "jsonwebtoken";

import config from "shared/config";
import { SpotifyProfile, SpotifyTokens } from "shared/types";

import { userService } from "@user";

// Spotify OAuth scopes — permissions needed from the user
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
].join(",");

export function getSpotifyAuthUrl(): string {
  const params = querystring.stringify({
    client_id: config.SPOTIFY_CLIENT_ID,
    response_type: "code", // Use OAuth Authorization Code Flow: user authorizes app, then backend exchanges code for tokens securely
    redirect_uri: config.REDIRECT_URI,
    scope: SCOPES,
    show_dialog: true,
  });

  return `https://accounts.spotify.com/authorize?${params}`;
}

/**
 * Orchestrates Spotify OAuth callback flow.
 */
export async function handleSpotifyCallback(userid: string, code: string) {
  const tokens = await exchangeCodeForTokens(code);
  const profile = await fetchSpotifyProfile(tokens.access_token);
  const user = await userService.syncSpotifyUser(userid, profile, tokens);

  // TODO: may not need to sign token again
  const authToken = signToken(user.id);

  return {
    ...user,
    authToken,
  };
}

async function exchangeCodeForTokens(code: string): Promise<SpotifyTokens> {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: config.REDIRECT_URI,
      client_id: config.SPOTIFY_CLIENT_ID,
      client_secret: config.SPOTIFY_CLIENT_SECRET,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data;
}

async function fetchSpotifyProfile(
  accessToken: string
): Promise<SpotifyProfile> {
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
}

const jwtLimit = 90 * 24 * 60 * 60; // 90 days in seconds
function signToken(id: string, expiresInSeconds: number = jwtLimit): string {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: expiresInSeconds });
}
