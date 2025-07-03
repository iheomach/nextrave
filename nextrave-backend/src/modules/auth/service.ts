import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "@config";
import { TokenPayload, UserDTO } from "@types";
import { AuthenticationError, NotFoundError } from "@errors";

import { userService } from "@user";

const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

export async function signupUser(
  email: string,
  username: string,
  password: string
): Promise<UserDTO> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userService.registerUser(email, username, hashedPassword);
  user.authToken = signToken(user.id);
  return user;
}

export async function loginUser(
  email: string,
  password: string
): Promise<UserDTO> {
  let user;
  try {
    user = await userService.getUserWithPassword(email);
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw new AuthenticationError("Invalid credentials");
    }
    throw err;
  }

  const valid = await bcrypt.compare(password, user.password!);
  if (!valid) throw new AuthenticationError("Invalid credentials");

  user.authToken = signToken(user.id);
  return user;
}

function signToken(userId: string): string {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAuthToken(token: string): TokenPayload {
  return { userId: "" };
}
