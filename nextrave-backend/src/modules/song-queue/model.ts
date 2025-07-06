import { Schema, model, Document, Types } from "mongoose";

export interface SongQueueItemSchema {
  songId: string;
  addedBy: Types.ObjectId;
  upvotes: [];
  downvotes: [];
  addedAt: Date;
}

export interface SongQueueSchema {
  items: SongQueueItemSchema[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SongQueueDocument
  extends SongQueueSchema,
    Document<Types.ObjectId> {}

const songQueueItemSchema = new Schema<SongQueueItemSchema>(
  {
    songId: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    downvotes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const songQueueSchema = new Schema<SongQueueDocument>(
  {
    items: [songQueueItemSchema],
  },
  { timestamps: true }
);

export const SongQueue = model<SongQueueDocument>("SongQueue", songQueueSchema);
