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

export async function findByEmailOrUsername(
  email: string,
  username: string
): Promise<UserDocument | null> {
  return User.findOne({
    $or: [{ email }, { username }],
  });
}

export async function findByEmail(
  email: string,
  includePassword = false
): Promise<UserDocument | null> {
  if (includePassword) {
    return User.findOne({ email }).select("+password");
  } else {
    return User.findOne({ email });
  }
}
