import dotenv from "dotenv";
import { cleanEnv, str, num } from "envalid";

dotenv.config();

/**
 * Validates and exposes required environment variables.
 * Fails fast on missing or invalid config.
 */
const config = cleanEnv(process.env, {
  // App
  APP_VERSION: str(),
  PORT: num({ default: 3000 }),

  // Spotify
  SPOTIFY_CLIENT_ID: str(),
  SPOTIFY_CLIENT_SECRET: str(),
  REDIRECT_URI: str(),

  // mongo
  DB_HOST: str(),
  DB_USER: str(),
  DB_PASS: str(),
  DB_CONNECTOR: str(),

  // Auth
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: num(),
});

export default config;
