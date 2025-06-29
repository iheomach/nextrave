import { User, UserDocument, UserSchema } from "./model";

export async function findBySpotifyId(
  spotifyId: string
): Promise<UserDocument | null> {
  return User.findOne({ spotifyId });
}

export async function createUser(
  data: Partial<UserSchema>
): Promise<UserDocument> {
  return User.create(data);
}

export async function updateUserBySpotifyId(
  spotifyId: string,
  data: Partial<UserSchema>
): Promise<UserDocument | null> {
  return User.findOneAndUpdate({ spotifyId }, data, { new: true });
}
