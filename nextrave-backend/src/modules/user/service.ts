import { SpotifyProfile, SpotifyTokens, UserDTO } from "@types";
import * as userRepository from "./repository";
import { UserDocument } from "./model";

export async function syncSpotifyUser(
  userId: string,
  profile: SpotifyProfile,
  tokens: SpotifyTokens
): Promise<UserDTO> {
  const tokenExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  const user = await userRepository.findById(userId);
  if (!user) throw new Error("User not found");

  user.spotifyId = profile.id;
  user.spotifyAccessToken = tokens.access_token;
  user.spotifyRefreshToken = tokens.refresh_token;
  user.tokenExpiresAt = tokenExpiresAt;

  const updatedUser = await userRepository.updateUser(userId, user);

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
