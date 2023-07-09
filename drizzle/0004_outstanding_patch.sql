ALTER TABLE `accounts` MODIFY COLUMN `created_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `post_likes` MODIFY COLUMN `created_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `created_at` datetime NOT NULL;