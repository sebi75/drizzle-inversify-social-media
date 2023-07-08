import {
	mysqlTable,
	text,
	int,
	uniqueIndex,
	primaryKey,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const users = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement(),
	email: text('email').notNull(),
	age: int('age').notNull(),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export const userProfile = mysqlTable(
	'user_profile',
	{
		id: int('id').primaryKey().autoincrement(),
		userId: int('user_id')
			.notNull()
			.references(() => users.id),
		profilePicture: text('profile_picture').notNull(),
		bio: text('bio').notNull(),
		age: int('age').notNull(),
	},
	(userProfile) => ({
		userIdIndex: uniqueIndex('user_id_idx').on(userProfile.userId),
	})
);

export type UserProfile = InferModel<typeof userProfile>;
export type NewUserProfile = InferModel<typeof userProfile, 'insert'>;

export const posts = mysqlTable('posts', {
	id: int('id').primaryKey().autoincrement(),
	creatorId: int('creator_id')
		.notNull()
		.references(() => users.id),
	text: text('text').notNull(),
});

export type Post = InferModel<typeof posts>;
export type NewPost = InferModel<typeof posts, 'insert'>;

export const postLikes = mysqlTable(
	'post_likes',
	{
		postId: int('post_id'),
		userId: int('user_id'),
	},
	(postLikes) => ({
		postIdIndex: primaryKey(postLikes.postId, postLikes.userId),
	})
);

export type PostLike = InferModel<typeof postLikes>;
export type NewPostLike = InferModel<typeof postLikes, 'insert'>;
