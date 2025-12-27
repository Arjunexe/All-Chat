import { model, models, Schema } from "mongoose";
import mongoose from "mongoose";

export interface Thread extends Document {
  title: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ThreadSchema = new Schema<Thread>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true },
);

const Thread = models.Thread || model<Thread>("Thread", ThreadSchema);
