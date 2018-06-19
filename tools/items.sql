-- ----------------------------
--  unit为商品的单位，如“瓶”，“盒”，“千克”，原始形态的单位
--  预留下SN—code和block-info
-- ----------------------------

DROP TABLE IF EXISTS `items`;

 CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `origin` varchar(100) NOT NULL,
  `category` varchar(100) ,
  `description` varchar(100) ,
  `unit` varchar(100),
  `balance` DOUBLE(10,2),
  `platform_id` varchar(100) NOT NULL,
  `sn_code` varchar(100),
  `block_info` varchar(2048),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;