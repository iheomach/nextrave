import { ClientSession } from "mongoose";
import { User, UserDocument, UserSchema } from "./model";

export async function findById(
  userId: string,
  session?: ClientSession
): Promise<UserDocument | null> {
  return User.findById(userId).session(session ?? null);
}

export async function createUser(
  data: Partial<UserSchema>,
  session?: ClientSession
): Promise<UserDocument> {
  return User.create([data], { session }).then(res => res[0]);
}

export async function updateUser(
  userId: string,
  data: Partial<UserSchema>,
  session?: ClientSession
): Promise<UserDocument | null> {
  return User.findByIdAndUpdate(userId, data, { new: true, session });
}

export async function findByEmailOrUsername(
  email: string,
  username: string,
  session?: ClientSession
): Promise<UserDocument | null> {
  return User.findOne({
    $or: [{ email }, { username }],
  }).session(session ?? null);
}

export async function findByEmail(
  email: string,
  includePassword = false,
  session?: ClientSession
): Promise<UserDocument | null> {
  const query = User.findOne({ email });
  if (includePassword) query.select("+password");
  return query.session(session ?? null);
}
