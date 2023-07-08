CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`creator_id` int NOT NULL,
	`text` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `user_profile` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int NOT NULL,
	`profile_picture` text NOT NULL,
	`bio` text NOT NULL,
	`age` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`age` int NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_idx` ON `user_profile` (`user_id`);--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_creator_id_users_id_fk` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_profile` ADD CONSTRAINT `user_profile_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;