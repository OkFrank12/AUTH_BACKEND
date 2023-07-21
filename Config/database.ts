import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL: string = process.env.DATABASE!;

export const dbConfig = () => {
  mongoose.connect(URL).then(() => {
    console.log("Server and Database is connected");
  });
};
