import { Request, Response, NextFunction } from "express";

import { authService } from "@auth";
import { AuthenticatedRequest } from "@types";
import { AuthenticationError, NotFoundError, ValidationError } from "@errors";

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

export function errorHandler(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof AuthenticationError) {
    res.status(401).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "something went wrong" });
}
