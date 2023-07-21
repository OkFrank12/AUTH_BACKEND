import mongoose, { Schema } from "mongoose";
import { iPost } from "../Utils/interfaces";

interface iPostData extends iPost, mongoose.Document {}

const postSchema: Schema<iPost> = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    views: {
      type: Array<String>,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "auths",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iPostData>("posts", postSchema);
