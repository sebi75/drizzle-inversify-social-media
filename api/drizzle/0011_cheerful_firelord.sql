CREATE TABLE `post_reposts` (
	`post_id` int NOT NULL,
	`created_at` datetime NOT NULL,
	`user_id` int NOT NULL,
	`repost_id` int,
	PRIMARY KEY(`post_id`,`user_id`)
);
--> statement-breakpoint
ALTER TABLE `posts` RENAME COLUMN `image_url` TO `media_url`;--> statement-breakpoint
ALTER TABLE `accounts` ADD `is_verified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `posts` ADD `updated_at` datetime;--> statement-breakpoint
ALTER TABLE `posts` ADD `is_possibly_sensitive` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `posts` ADD `media_type` enum('image','video') NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `references_post_id` int;--> statement-breakpoint
ALTER TABLE `posts` ADD `privacy` enum('private','public') DEFAULT 'public' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_references_post_id_posts_id_fk` FOREIGN KEY (`references_post_id`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `post_reposts` ADD CONSTRAINT `post_reposts_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_reposts` ADD CONSTRAINT `post_reposts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_reposts` ADD CONSTRAINT `post_reposts_repost_id_posts_id_fk` FOREIGN KEY (`repost_id`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;