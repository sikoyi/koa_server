// 数据模型层 执行数据操作
"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/db");

const User = sequelize.define("user", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  github_id: { type: Sequelize.STRING(255) }, // github Id
  nickname: Sequelize.STRING(60), // 用户名
  username: Sequelize.STRING(60), // 账号
  password: Sequelize.STRING(100), // 密码
  status: DataTypes.TINYINT,
  avatar: Sequelize.STRING(255), // 头像路径
  last_login: Sequelize.DATE, // 最后登录时间
});

module.exports = User;
