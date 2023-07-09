CREATE TABLE `accounts` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2023-07-09 10:18:00.936',
	`updated_at` datetime,
	`hashed_password` text NOT NULL,
	`last_login` datetime NOT NULL);
--> statement-breakpoint
ALTER TABLE `user_profile` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `user_profile` ADD PRIMARY KEY (`user_id`);--> statement-breakpoint
DROP INDEX `user_id_idx` ON `user_profile`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `post_likes` ADD `created_at` datetime DEFAULT '2023-07-09 10:18:00.936' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `created_at` datetime DEFAULT '2023-07-09 10:18:00.936' NOT NULL;--> statement-breakpoint
ALTER TABLE `user_profile` ADD `updated_at` datetime;--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `accounts` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_email_users_email_fk` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE no action ON UPDATE no action;