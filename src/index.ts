import express from "express";
import dotenv from "dotenv";
import userRoutes from "./interface/routes/user.ts";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

export function createApp() {
  const app = express();
  app.use(cors());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded());

  // parse application/json
  app.use(bodyParser.json());
  app.use(userRoutes);

  return app;
}
