const Sequelize = require("sequelize");
let config = require("./config.json").development;

console.log("init sequelize...");

//创建连接池
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: "mysql",
    pool: {
      max: 5, // 连接池最大连接数量
      min: 0, // 最小连接数量
      idle: 10000, // 如果一个线程10s内没有被用过就释放
    },
    define: {
      // schema和schemaDelimiter为表前缀，不需要可以删除
      // schema: 'koa',
      // 连接字符
      // schemaDelimiter: '-',
      // 是否自动添加时间戳
      timestamps: false,
      freezeTableName: true,
    },
  }
);

// 测试是否能连通
sequelize
  .authenticate()
  .then(async () => {
    // await sequelize.sync({ force: true }); // 同步所有模型
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败", err);
  });

module.exports = sequelize;
