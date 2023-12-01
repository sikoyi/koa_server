const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');

const config = require('./config/config.default');
const router = require('./router');

// const session = require('koa-session-minimal');
// const MysqlStore = require('koa-mysql-session');

const staticPath = './public';

// session存储配置
const sessionMysqlConfig = {
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	host: config.database.HOST,
};

// app.use(
// 	session({
// 		key: 'USER_SID',
// 		store: new MysqlStore(sessionMysqlConfig),
// 	})
// );

app.use(static(path.join(__dirname, staticPath))); // 暴露静态资源
app.use(bodyParser()); // 解析POST请求的body内容

app.use(router.routes()).use(router.allowedMethods()); // 注册路由

app.listen(config.mailer.prot, () => {
	console.log(`serverDidReady http://127.0.0.1:${config.mailer.prot}`);
});

module.exports = app;
