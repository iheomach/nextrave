import { SpotifyProfile, SpotifyTokens, UserDTO } from "@types";
import * as userRepository from "./repository";
import { UserDocument } from "./model";
import { ValidationError, NotFoundError } from "@errors";

export async function registerUser(
  email: string,
  username: string,
  hashedPassword: string
): Promise<UserDTO> {
  const existingUser = await userRepository.findByEmailOrUsername(
    email,
    username
  );
  if (existingUser)
    throw new ValidationError("Email or username already taken");

  const user = await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
    profileImage: getDefaultAvatarUrl(),
  });

  return toUserDTO(user);
}

export async function getUserWithPassword(
  email: string
): Promise<UserDTO & { password: string }> {
  const user = await userRepository.findByEmail(email, true);
  if (!user) throw new NotFoundError("User not found");

  const dto = toUserDTO(user);
  return { ...dto, password: user.password! };
}

export async function syncSpotifyUser(
  userId: string,
  profile: SpotifyProfile,
  tokens: SpotifyTokens
): Promise<UserDTO> {
  const tokenExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundError("User not found");

  user.spotifyId = profile.id;
  user.spotifyAccessToken = tokens.access_token;
  user.spotifyRefreshToken = tokens.refresh_token;
  user.spotifyTokenExpiresAt = tokenExpiresAt;

  const updatedUser = await userRepository.updateUser(userId, user);
  if (!updatedUser) throw new Error("Failed to update user");

  return toUserDTO(updatedUser);
}

function toUserDTO(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    displayName: user.username,
    email: user.email,
    profileImage: user.profileImage,
    spotifyId: user.spotifyId,
  };
}

function getDefaultAvatarUrl(): string {
  return "https://www.gravatar.com/avatar/?d=mp";
}
