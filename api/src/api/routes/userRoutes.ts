import { type Container } from "inversify";
import type UserController from "@/api/controllers/UserController";
import { TYPES } from "@/lib/types";
import { Router } from "express";

export const userRoutes = (container: Container) => {
  const router = Router();
  const userController = container.get<UserController>(TYPES.UserController);

  router.get("/", userController.getUsers);
  router.get("/:id", userController.getUser);
  router.post("/:id", userController.updateProfile);

  return router;
};
