const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const convert = require('koa-convert'); // 将 generator 写法的中间件转换成promise 写法
const koaLogger = require('koa-logger'); // 日志插件
const compose = require('koa-compose');

const config = require('./config/config.default');
const router = require('./app/router');

const session = require('koa-session-minimal');
// const MysqlStore = require('koa-mysql-session');
const JWT = require('koa-jwt');
const errorHandle = require('./app/middleware/jwtErrhandle');

// session存储配置  aasfsvxvcb
const sessionMysqlConfig = {
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	host: config.database.HOST,
};

const jwt = JWT({
	secret: config.jwt.secret,
}).unless(config.jwt.unless);

// app.use(
// 	session({
// 		key: 'USER_SID',
// 		store: new MysqlStore(sessionMysqlConfig),
// 	})
// );

const middleware = compose([errorHandle, jwt]);

app.use(middleware);

// 控制台日志中间件
app.use(convert(koaLogger()));

app.use(bodyParser()); // 解析POST请求的body内容

app.use(convert(static(config.static.dir(__dirname)))); // 暴露静态资源

app.use(router.routes()).use(router.allowedMethods()); // 注册路由

app.listen(config.mailer.prot, () => {
	console.log(`start server http://${config.mailer.host}:${config.mailer.prot}`);
});

module.exports = app;
