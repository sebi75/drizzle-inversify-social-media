CREATE TABLE `user_email_settings` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` int NOT NULL,
	`subscribed` boolean DEFAULT true);
--> statement-breakpoint
ALTER TABLE `user_email_settings` ADD CONSTRAINT `user_email_settings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;