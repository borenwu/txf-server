DROP TABLE IF EXISTS `images`;

 CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(100),
  `type` varchar(100),
  `url` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;