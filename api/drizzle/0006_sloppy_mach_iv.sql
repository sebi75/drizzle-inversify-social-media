ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_email_users_email_fk`;
--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_accounts_email_fk` FOREIGN KEY (`email`) REFERENCES `accounts`(`email`) ON DELETE no action ON UPDATE no action;