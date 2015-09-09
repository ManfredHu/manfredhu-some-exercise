/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50704
Source Host           : localhost:3306
Source Database       : db_codemanage

Target Server Type    : MYSQL
Target Server Version : 50704
File Encoding         : 65001

Date: 2015-05-01 10:21:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_file
-- ----------------------------
DROP TABLE IF EXISTS `tb_file`;
CREATE TABLE `tb_file` (
  `FileID` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件表主键',
  `UserID` int(11) NOT NULL COMMENT '上传用户ID',
  `FatherFileID` int(11) NOT NULL COMMENT '父目录文件ID（0表示没有父目录，即为用户目录根文件）',
  `Path` varchar(100) NOT NULL COMMENT '文件路径',
  `Name` varchar(50) NOT NULL COMMENT '文件名称（或项目名称）',
  `Description` text NOT NULL COMMENT '描述',
  `UploadTime` datetime NOT NULL COMMENT '上传时间',
  `IsShare` bit(1) NOT NULL COMMENT '是否共享（0否1是）',
  PRIMARY KEY (`FileID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_file
-- ----------------------------
INSERT INTO `tb_file` VALUES ('1', '5', '0', 'Code\\csb', 'csb', '', '2015-05-01 00:00:00', '');
INSERT INTO `tb_file` VALUES ('2', '6', '0', 'Code\\zyq', 'zyq', '', '2015-05-01 00:00:00', '');
INSERT INTO `tb_file` VALUES ('3', '7', '0', 'Code\\hwf', 'hwf', '', '2015-05-01 00:00:00', '');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户表主键',
  `UserName` varchar(20) NOT NULL COMMENT '用户名',
  `Name` varchar(20) NOT NULL COMMENT '用户名称',
  `Password` varchar(50) NOT NULL COMMENT '用户密码',
  `IsManager` bit(1) NOT NULL COMMENT '是否为管理员(0或1)',
  `Email` varchar(20) NOT NULL COMMENT '用户联系邮箱',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('5', 'csb', '陈少波', 'af56d1882cfea3759b6e5878f9f4ffa3', '\0', '3113006110@qq.com');
INSERT INTO `tb_user` VALUES ('6', 'zyq', '周宇钦', 'e1e61134e95a208f76565f10068d93e5', '\0', '3113006110@qq.com');
INSERT INTO `tb_user` VALUES ('7', 'hwf', '胡文峰', 'c03223e4c2e74fdac0e5f7469073da26', '\0', '3113006110@qq.com');
INSERT INTO `tb_user` VALUES ('8', 'root', '管理员', '63a9f0ea7bb98050796b649e85481845', '', 'root@root.com');
