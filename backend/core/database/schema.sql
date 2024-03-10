-- DDL 
CREATE TABLE `user` (
  `id` varchar(255) PRIMARY KEY,
  `email` varchar(255) UNIQUE,
  `username` varchar(255),
  `password` varchar(255),
  `role` varchar(255)
);



-- Injection
INSERT INTO `user` (`id`, `email`, `username`, `password`, `role`)
VALUES  ('5c5e4a62-b4eb-45e0-b3b1-1089445c4c7b','admin@admin.com', 'admin', 'admin', 'admin');
