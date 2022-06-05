USE webfinal;
ALTER DATABASE webfinal default charset=utf8 collate utf8_general_ci; 

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sns_id` mediumtext NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COMMENT '사용자';

DROP TABLE IF EXISTS `lecture`;
CREATE TABLE `lecture` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `professor` varchar(10) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COMMENT '강의';

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `lecture_id` int unsigned NOT NULL,
  `title` varchar(10) NOT NULL,
  `content` mediumtext NOT NULL,
  `point` mediumint unsigned NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
   CONSTRAINT `post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
   CONSTRAINT `post_lecture_id` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT '포스트글';

DROP TABLE IF EXISTS `point`;
CREATE TABLE `point` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `point` mediumint unsigned NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
   CONSTRAINT `point_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT '포인트 적립';

DROP TABLE IF EXISTS `pay`;
CREATE TABLE `pay` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `post_id` int unsigned NOT NULL,
  `point` mediumint unsigned NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
   CONSTRAINT `pay_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
   CONSTRAINT `pay_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT '포인트 적립';