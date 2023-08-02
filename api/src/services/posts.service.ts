import { injectable, inject } from "inversify";
import { TYPES } from "@/lib/types";
import PostsRepository from "@/repositories/postsRepository";
import {
  type insertPostSchema,
  type insertPostRequestSchema,
} from "@/db/schema";
import { type z } from "zod";
import UserService from "./user.service";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";
import PostsClassifierService from "./posts-classifier.service";

@injectable()
class PostsService {
  constructor(
    @inject(TYPES.PostsRepository) private postsRepository: PostsRepository,
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.PostsClassifierService)
    private postsClassifierService: PostsClassifierService
  ) {}

  async createPost(
    params: z.infer<typeof insertPostRequestSchema>,
    userId: number
  ) {
    // this will send a message so we can classify the post in the worker process
    const classificationResult = this.postsClassifierService.classifyPost(
      params.text,
      params.mediaURL as string
    );

    if (classificationResult.isSpam) {
      throw new UnauthorizedError("You are not allowed to post spam");
    }

    const insertParams: z.infer<typeof insertPostSchema> = {
      ...params,
      creatorId: userId,
      createdAt: new Date(),
      isPossiblySensitive: classificationResult.isPossiblySensitive,
    };
    const post = await this.postsRepository.createPost(insertParams);
    return post;
  }

  async getPostById(postId: number) {
    return await this.postsRepository.getPostById(postId);
  }

  async updatePost(
    postId: number,
    userId: number,
    params: Partial<z.infer<typeof insertPostSchema>>
  ) {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    if (post.creatorId !== userId) {
      throw new UnauthorizedError("You are not allowed to modify this post");
    }
    return await this.postsRepository.updatePost(postId, params);
  }
}

export default PostsService;
