DROP TABLE IF EXISTS `platforms`;

 CREATE TABLE `platforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(100) NOT NULL,
  `province` varchar(100) ,
  `city` varchar(100) ,
  `description` varchar(100) ,
  `secret` varchar(100),
  `due_date` DATE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;