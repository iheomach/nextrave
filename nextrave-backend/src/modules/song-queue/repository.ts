import { ClientSession } from "mongoose";

import { SongQueue, SongQueueDocument } from "./model";

export async function createQueue(
  session?: ClientSession
): Promise<SongQueueDocument> {
  const queue = await SongQueue.create({ items: [] });
  return queue;
}
