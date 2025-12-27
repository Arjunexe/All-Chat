import mongoose, { model, models, Schema } from "mongoose";

export interface Comment extends Document {
  threadId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  comment: string;
  likesCount: number;
}

const CommentSchema = new Schema<Comment>(
  {
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    likesCount: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true },
);

const Comment = models.Comment || model<Comment>("Comment", CommentSchema);
