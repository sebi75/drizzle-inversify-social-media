CREATE TABLE `post_likes` (
	`post_id` int NOT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY(`post_id`,`user_id`)
);
