import { Request, Response } from "express";

export function handleLogin(req: Request, res: Response) {
  console.log("called login handler");
}

export function handleSignup(req: Request, res: Response) {
  console.log("called signup handler");
}
