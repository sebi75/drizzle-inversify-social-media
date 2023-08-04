import { Router } from "express";
import { type Container } from "inversify";
import type PostsController from "../controllers/PostsController";
import { TYPES } from "@/lib/types";

export const postRouter = (container: Container) => {
  const router = Router();
  const postsController = container.get<PostsController>(TYPES.PostsController);

  router.get("/", postsController.getPosts);
  router.post("/", postsController.createPost);
};
