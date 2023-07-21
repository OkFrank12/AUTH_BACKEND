import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./Router/authRouter";

export const mainApp = (app: Application) => {
  app
    .use(express.json())
    .use(cors())
    .use("/api/v1/auth", auth)
    .get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "API is ready to be consumed",
        });
      } catch (error) {
        console.log("error");
      }
    });
};
