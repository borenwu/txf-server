-- ----------------------------
--  orders是展现在客户端的‘商品’，考虑到拼团，原始商品打包等多种因素，
--  不能将Item直接展示在客户端，所以用orders，称之为订单
--  unit为原始商品的单位，如“瓶”，“盒”，“千克”，
--  如果是遇到了需要打包装的订单，比如水果，客户订的时候也许用到的unit不是kg而是‘盒’
--  所以使用spec这个字段，称之为规格，目的是为了方便盘库统计
-- ----------------------------

DROP TABLE IF EXISTS `orders`;

 CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(100) NOT NULL,
  `title` varchar(2048) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `market_price` DOUBLE(10,2) ,
  `sale_price` DOUBLE(10,2) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `spec` varchar(100),
  `platform_id` varchar(100) NOT NULL,
  `community_id` varchar(100) NOT NULL,
  `open_date` DATETIME,
  `close_date` DATETIME,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;