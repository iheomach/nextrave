import { NextFunction, Request, Response } from "express";
import { UserDTO } from "shared/types";

import * as authService from "./service";

interface SignupBody {
  email: string;
  username: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export async function handleSignup(
  req: Request<{}, {}, SignupBody>,
  res: Response<UserDTO | { error: string }>,
  next: NextFunction
) {
  try {
    const { email, username, password } = req.body;
    const user = await authService.signupUser(email, username, password);
    res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }
}

export async function handleLogin(
  req: Request<{}, {}, LoginBody>,
  res: Response<UserDTO | { error: string }>,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    res.status(200).json(user);
  } catch (err: any) {
    next(err);
  }
}
