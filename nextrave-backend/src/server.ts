import app from "./app";
import config from "@config";
import { connectToMongoDB } from "@mongodb";

connectToMongoDB({
  host: config.DB_HOST,
  user: config.DB_USER,
  pass: config.DB_PASS,
  connector: config.DB_CONNECTOR,
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
