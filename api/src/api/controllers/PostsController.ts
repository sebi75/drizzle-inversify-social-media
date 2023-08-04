import { TYPES } from "@/lib/types";
import PostsService from "@/services/posts.service";
import { injectable, inject } from "inversify";
import { Security } from "../middlewares/security";
import { Request, Response } from "express";
import { insertPostRequestSchema } from "@/db/schema";
import { BadRequestError } from "@/lib/errors";
import { logger } from "@/utils/logger";
import { StatusCode } from "@/types/statusCodes";

@injectable()
class PostsController {
  constructor(@inject(TYPES.PostsService) private postsService: PostsService) {}

  @Security()
  async getPosts(__: Request, _: Response): Promise<void> {
    // const posts = await this.postsService.getPosts();
    // res.status(200).json(posts);
    //implement
  }

  @Security()
  async createPost(req: Request, res: Response): Promise<void> {
    const userId = req.ctx?.user.id as number;
    const data = insertPostRequestSchema.safeParse(req.body);
    if (!data.success) {
      logger.error("input::validation::error::", data.error);
      throw new BadRequestError("Invalid input");
    }

    const post = await this.postsService.createPost(data.data, userId);

    res.status(StatusCode.CREATED).json(post);
  }
}

export default PostsController;
