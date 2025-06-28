import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "API is up!" });
});

export default router;
