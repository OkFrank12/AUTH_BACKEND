import express, { Application } from "express";
import dotenv from "dotenv";
import { dbConfig } from "./Config/database";
import { mainApp } from "./mainApp";
dotenv.config();

const realPort: number = parseInt(process.env.PORT!);
const port: number = realPort;

const app: Application = express();
mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("Server is listening because of uncaught exception");
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Server is shutting down because of unhandled rejection");
  console.log("unhandledRejction: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
