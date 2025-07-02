import { Request, Response, NextFunction } from "express";

import { authService } from "@auth";
import { AuthenticatedRequest } from "@types";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send("Unauthorized");
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = authService.verifyAuthToken(token);
    (req as AuthenticatedRequest).userId = payload.userId;
    next();
  } catch {
    res.status(403).send("Invalid token");
  }
}
