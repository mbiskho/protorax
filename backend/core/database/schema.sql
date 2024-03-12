-- DDL 
CREATE TABLE `user` (
  `id` varchar(255) PRIMARY KEY,
  `email` varchar(255) UNIQUE,
  `username` varchar(255),
  `password` varchar(255),
  `role` varchar(255)
);

CREATE TABLE `course` (
  `id` varchar(255) PRIMARY KEY,
  `name` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_teacher` varchar(255),
  `rating` integer,
  `description` varchar(255),
  `photo` longblob,
  `category` varchar(255),
  `level` varchar(255),
  `price` integer,
  `status` integer
);

CREATE TABLE `task` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255),
  `description` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deadline` timestamp
);

ALTER TABLE `task`
    ADD COLUMN `id_course` varchar(255) AFTER `id`,
    ADD FOREIGN KEY (`id_course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Injection
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`)
VALUES  ('5c5e4a62-b4eb-45e0-b3b1-1089445c4c7b','admin@admin.com', 'admin', 'admin', 'admin');
