import mongoose from "mongoose";

type MongoConfig = {
  host: string;
  user: string;
  pass: string;
  connector: string;
};

/**
 * Initialize the MongoDB connection using Mongoose.
 */
export async function connectToMongoDB({
  host,
  user,
  pass,
  connector,
}: MongoConfig) {
  try {
    await mongoose.connect(`${host}://${user}:${pass}@${connector}`);
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
