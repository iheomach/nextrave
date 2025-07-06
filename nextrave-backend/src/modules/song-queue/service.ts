import { ClientSession } from "mongoose";

import * as songQueueRepository from "./repository";
import { SongQueueDocument } from "./model";

export async function createQueue(
  session?: ClientSession
): Promise<SongQueueDocument> {
  return await songQueueRepository.createQueue();
}
