import { TokenPayload } from "@types";

export function verifyAuthToken(token: string): TokenPayload {
  return { userId: "" };
}
