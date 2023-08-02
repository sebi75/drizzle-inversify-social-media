import { type insertPostSchema, posts } from "@/db/schema";
import { type z } from "zod";
import { TYPES } from "@/lib/types";
import { inject, injectable } from "inversify";
import Database from "@/db/db";
import { eq } from "drizzle-orm";

@injectable()
class PostsRepository {
  constructor(@inject(TYPES.Database) private db: Database) {}

  async createPost(post: z.infer<typeof insertPostSchema>) {
    const db = this.db.getDb();
    const [newlyCreatedPost] = await db.insert(posts).values(post);
    const postId = newlyCreatedPost.insertId;
    const [createdPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId));
    return createdPost;
  }

  async updatePost(
    postId: number,
    params: Partial<z.infer<typeof insertPostSchema>>
  ) {
    const db = this.db.getDb();
    await db.update(posts).set(params).where(eq(posts.id, postId));
    const [updatedPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId));
    return updatedPost;
  }

  async getPostById(postId: number) {
    const db = this.db.getDb();
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));

    return post;
  }
}

export default PostsRepository;
