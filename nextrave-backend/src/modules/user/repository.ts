import { User, UserDocument, UserSchema } from "./model";

export async function findById(userId: string): Promise<UserDocument | null> {
  return User.findById(userId);
}

export async function createUser(
  data: Partial<UserSchema>
): Promise<UserDocument> {
  return User.create(data);
}

export async function updateUser(
  userId: string,
  data: Partial<UserSchema>
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, data, { new: true });
}
