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
} from 'drizzle-orm/mysql-core';
import { type InferModel } from 'drizzle-orm';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export const users = mysqlTable(
	'users',
	{
		id: int('id').primaryKey().autoincrement(),
		email: varchar('email', {
			length: 255,
		})
			.notNull()
			.references(() => accounts.email),
		age: int('age').notNull(),
		whitelisted: boolean('whitelisted').default(false),
		banned: boolean('banned').default(false),
		role: mysqlEnum('user_role', [UserRole.ADMIN, UserRole.USER])
			.default(UserRole.USER)
			.notNull(),
	},
	(users) => ({
		uniqueIndex: uniqueIndex('email_idx').on(users.email),
	})
);

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export const userProfile = mysqlTable('user_profile', {
	userId: int('user_id')
		.primaryKey()
		.references(() => users.id),
	profilePicture: text('profile_picture').notNull(),
	updatedAt: datetime('updated_at'),
	bio: text('bio').notNull(),
	age: int('age').notNull(),
});

export type UserProfile = InferModel<typeof userProfile>;
export type NewUserProfile = InferModel<typeof userProfile, 'insert'>;

export const userEmailSettings = mysqlTable('user_email_settings', {
	id: int('id').primaryKey().autoincrement(),
	userId: int('user_id')
		.notNull()
		.references(() => users.id),
	subscribed: boolean('subscribed').default(true),
});

export type UserEmailSettings = InferModel<typeof userEmailSettings>;
export type NewUserEmailSettings = InferModel<
	typeof userEmailSettings,
	'insert'
>;

export const accounts = mysqlTable(
	'accounts',
	{
		id: int('id').primaryKey().autoincrement(),
		email: varchar('email', {
			length: 255,
		}).notNull(),
		createdAt: datetime('created_at').notNull(),
		updatedAt: datetime('updated_at'),
		hashedPassword: text('hashed_password').notNull(),
		lastLogin: datetime('last_login').notNull(),
	},
	(accounts) => ({
		emailIndex: uniqueIndex('email_idx').on(accounts.email),
	})
);

export type Account = InferModel<typeof accounts>;
export type NewAccount = InferModel<typeof accounts, 'insert'>;

export const posts = mysqlTable('posts', {
	id: int('id').primaryKey().autoincrement(),
	creatorId: int('creator_id')
		.notNull()
		.references(() => users.id),
	createdAt: datetime('created_at').notNull(),
	text: text('text').notNull(),
});

export type Post = InferModel<typeof posts>;
export type NewPost = InferModel<typeof posts, 'insert'>;

export const postLikes = mysqlTable(
	'post_likes',
	{
		postId: int('post_id'),
		createdAt: datetime('created_at').notNull(),
		userId: int('user_id'),
	},
	(postLikes) => ({
		postIdIndex: primaryKey(postLikes.postId, postLikes.userId),
	})
);

export type PostLike = InferModel<typeof postLikes>;
export type NewPostLike = InferModel<typeof postLikes, 'insert'>;
