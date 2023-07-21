import { iAuth } from "../Utils/interfaces";
import mongoose from "mongoose";

interface iAuthData extends iAuth, mongoose.Document {}

const authSchema: mongoose.Schema<iAuth> = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  avatarID: {
    type: String,
  },
  post: [
    {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  ],
});

export default mongoose.model<iAuthData>("auths", authSchema);
