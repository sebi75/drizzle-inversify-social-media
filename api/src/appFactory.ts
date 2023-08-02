import "reflect-metadata";
import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { container } from "@/lib/ioc";

dotenv.config();

import { userRoutes } from "@/api/routes/userRoutes";
import { authRoutes } from "@/api/routes/authRoutes";
import type RabbitMqService from "./services/rabbitmq.service";
import { TYPES } from "./lib/types";
import { logger } from "./utils/logger";

export const createApp = async (withRoutes = true) => {
  const app = express();
  const rabbitmqService = container.get<RabbitMqService>(TYPES.RabbitMqService);
  try {
    await rabbitmqService.initialize(["posts-classifier", "notifications"]);
  } catch (error) {
    logger.error("RabbitMQ::initialize::error", error);
    process.exit(1);
  }

  if (withRoutes) {
    app.use(express.json());

    app.get("/ping", (req: Request, res: Response) => {
      return res.send({
        message: "pong",
      });
    });

    app.use(express.urlencoded({ extended: true }));
    app.use("/users", userRoutes(container));
    app.use("/auth", authRoutes(container));
  }
  return app;
};
