import { SpotifyProfile, SpotifyTokens, UserDTO } from "modules/types";
import * as userRepository from "./repository";
import { UserDocument } from "./model";

export async function syncSpotifyUser(
  profile: SpotifyProfile,
  tokens: SpotifyTokens
): Promise<UserDTO> {
  const tokenExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);
  const profileImage = profile.images?.[0]?.url || getDefaultAvatarUrl();
  const displayName = profile.display_name || getDefaultDisplayName();

  const existing = await userRepository.findBySpotifyId(profile.id);

  const user = existing
    ? await userRepository.updateUserBySpotifyId(profile.id, {
        displayName,
        email: profile.email,
        profileImage,
        spotifyAccessToken: tokens.access_token,
        spotifyRefreshToken: tokens.refresh_token,
        tokenExpiresAt,
      })
    : await userRepository.createUser({
        spotifyId: profile.id,
        displayName,
        email: profile.email,
        profileImage,
        spotifyAccessToken: tokens.access_token,
        spotifyRefreshToken: tokens.refresh_token,
        tokenExpiresAt,
      });

  if (!user) throw new Error("Failed to save or update Spotify user");

  return toUserDTO(user);
}

function toUserDTO(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    displayName: user.displayName,
    email: user.email,
    profileImage: user.profileImage,
    spotifyId: user.spotifyId,
  };
}

function getDefaultDisplayName(): string {
  return "Guest";
}

function getDefaultAvatarUrl(): string {
  return "https://www.gravatar.com/avatar/?d=mp";
}
