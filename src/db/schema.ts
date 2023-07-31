import {
  mysqlTable,
  text,
  varchar,
  mysqlEnum,
  int,
  boolean,
  uniqueIndex,
  primaryKey,
  datetime,
  type AnyMySqlColumn,
} from "drizzle-orm/mysql-core";
import { type InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export const users = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    email: varchar("email", {
      length: 255,
    })
      .notNull()
      .references(() => accounts.email),
    whitelisted: boolean("whitelisted").default(false),
    banned: boolean("banned").default(false),
    role: mysqlEnum("user_role", [UserRole.ADMIN, UserRole.USER])
      .default(UserRole.USER)
      .notNull(),
    createdAt: datetime("created_at").notNull(),
  },
  (users) => ({
    uniqueIndex: uniqueIndex("email_idx").on(users.email),
  })
);

// Schema for inserting a user
export const insertUserSchema = createInsertSchema(users, {
  role: z.string(),
});
// schema for inserting a user request
export const insertUserRequestSchema = insertUserSchema.pick({
  email: true,
  age: true,
});

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

export const userProfile = mysqlTable("user_profile", {
  userId: int("user_id")
    .primaryKey()
    .references(() => users.id),
  profilePicture: text("profile_picture").notNull(),
  updatedAt: datetime("updated_at"),
  bio: text("bio").notNull(),
  age: int("age").notNull(),
});

export const insertUserProfileSchema = createInsertSchema(userProfile);
export const selectUserProfileSchema = createSelectSchema(userProfile);
export const updateUserProfileSchemaRequest = insertUserProfileSchema.pick({
  profilePicture: true,
  bio: true,
  age: true,
});

export type UserProfile = InferModel<typeof userProfile>;

export const userEmailSettings = mysqlTable("user_email_settings", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  subscribed: boolean("subscribed").default(true),
});

export type UserEmailSettings = InferModel<typeof userEmailSettings>;
export type NewUserEmailSettings = InferModel<
  typeof userEmailSettings,
  "insert"
>;

export const accounts = mysqlTable(
  "accounts",
  {
    id: int("id").primaryKey().autoincrement(),
    email: varchar("email", {
      length: 255,
    }).notNull(),
    isVerified: boolean("is_verified").default(false),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at"),
    hashedPassword: text("hashed_password").notNull(),
    lastLogin: datetime("last_login").notNull(),
  },
  (accounts) => ({
    emailIndex: uniqueIndex("email_idx").on(accounts.email),
  })
);

export type Account = InferModel<typeof accounts>;
export type NewAccount = InferModel<typeof accounts, "insert">;

export enum PostMediaType {
  IMAGE = "image",
  VIDEO = "video",
}
export enum PostPrivacy {
  PUBLIC = "public",
  PRIVATE = "private",
}
/**
 * Acceptance criteria:
 * - A user can have multiple posts
 * - A post can have multiple likes
 * - A user can like a post only once
 * - A user can like their own post
 * - A user can start a post by referecing other posts
 * - A user can repost a post from other users
 */
export const posts = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement(),
  creatorId: int("creator_id")
    .notNull()
    .references(() => users.id),
  updatedAt: datetime("updated_at"),
  archived: boolean("archived").default(false), // when the user deletes a post, internally we just mark it as archived
  isPossiblySensitive: boolean("is_possibly_sensitive").default(false),
  mediaType: mysqlEnum("media_type", [
    PostMediaType.IMAGE,
    PostMediaType.VIDEO,
  ]).notNull(),
  referencesPostId: int("references_post_id").references(
    (): AnyMySqlColumn => posts.id
  ), // workaround due to typescript limitations
  mediaURL: text("media_url").default(""),
  createdAt: datetime("created_at").notNull(),
  privacy: mysqlEnum("privacy", [PostPrivacy.PRIVATE, PostPrivacy.PUBLIC])
    .notNull()
    .default(PostPrivacy.PUBLIC),
  text: text("text").notNull(),
});

export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);
export const insertPostRequestSchema = insertPostSchema.pick({
  referencesPostId: true,
  mediaURL: true,
  mediaType: true,
  text: true,
  privacy: true,
});

export type Post = InferModel<typeof posts>;
export type NewPost = InferModel<typeof posts, "insert">;

export const postLikes = mysqlTable(
  "post_likes",
  {
    postId: int("post_id"),
    createdAt: datetime("created_at").notNull(),
    userId: int("user_id"),
  },
  (postLikes) => ({
    postIdIndex: primaryKey(postLikes.postId, postLikes.userId),
  })
);

export type PostLike = InferModel<typeof postLikes>;
export type NewPostLike = InferModel<typeof postLikes, "insert">;

export const postReposts = mysqlTable(
  "post_reposts",
  {
    postId: int("post_id").references(() => posts.id),
    createdAt: datetime("created_at").notNull(),
    userId: int("user_id").references(() => users.id),
    repost_id: int("repost_id").references(() => posts.id),
  },
  (postReposts) => ({
    // an individual user can only repost a post once
    postRepostsIndex: primaryKey(postReposts.postId, postReposts.userId),
  })
);

export type PostRepost = InferModel<typeof postReposts>;
export type NewPostRepost = InferModel<typeof postReposts, "insert">;
