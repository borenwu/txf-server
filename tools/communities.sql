DROP TABLE IF EXISTS `communities`;

 CREATE TABLE `communities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `community_name` varchar(100) NOT NULL,
  `province` varchar(100) ,
  `city` varchar(100) ,
  `description` varchar(100) ,
  `platform_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;