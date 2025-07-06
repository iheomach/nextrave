import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "shared/config";
import { TokenPayload, UserDTO } from "shared/types";
import { AuthenticationError, NotFoundError } from "shared/errors";

import { userService } from "@user";

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
    user = await userService.getUser(email, true);
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

export function verifyAuthToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as TokenPayload;
    return payload;
  } catch (err) {
    throw new AuthenticationError("Invalid or expired token");
  }
}

function signToken(userId: string): string {
  return jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
}
