import express from "express";

import config from "@config";
import { authRouter } from "@auth";

const app = express();

app.use(express.json());
app.use(`/api/v${config.APP_VERSION}`, authRouter);

export default app;
