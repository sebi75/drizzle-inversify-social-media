import "reflect-metadata";
import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { container } from "@/lib/ioc";

dotenv.config();

import { userRoutes } from "@/api/routes/userRoutes";
import { authRoutes } from "@/api/routes/authRoutes";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/ping", (req: Request, res: Response) => {
    return res.send({
      message: "pong",
    });
  });

  app.use(express.urlencoded({ extended: true }));
  app.use("/users", userRoutes(container));
  app.use("/auth", authRoutes(container));
  return app;
};
