const Router = require('koa-router');
const userRouter = new Router();

let accessToken = 'init_s_token'; //短token
let refreshToken = 'init_l_token'; //长token

// 5s 刷新一次短token
setInterval(() => {
	accessToken = 's_tk' + Math.random();
}, 5000);

// 5s 刷新一次短token
setInterval(() => {
	accessToken = 's_tk' + Math.random();
}, 60_000 * 60);

// 登录
userRouter.post('/login', async (ctx) => {
	ctx.body = {
		code: 0,
		data: {
			accessToken,
			refreshToken,
		},
		message: '',
	};
});

// 刷新短token
userRouter.post('/refresh', async (ctx) => {
	let { pass } = ctx.headers;
	if (pass !== refreshToken) {
		ctx.body = {
			code: 108,
			data: null,
			message: '长token过期, 请重新登录',
		};
	} else {
		ctx.body = {
			code: 0,
			data: {
				accessToken,
			},
			message: 'ok',
		};
	}
});

// 登出
userRouter.post('/logout', async (ctx) => {});

// 注册
userRouter.post('/register', async (ctx) => {});

// 删除账号
userRouter.post('/delete', async (ctx) => {});

// 更新账号信息
userRouter.post('/update', async (ctx) => {});

// 获取账号信息
userRouter.post('/get', async (ctx) => {
	let { authorization } = ctx.headers;
	if (authorization !== accessToken) {
		ctx.body = {
			code: 104,
			message: 'token过期',
		};
	} else {
		ctx.body = {
			code: 0,
			data: {
				id: Math.random(),
			},
		};
	}
});

module.exports = userRouter;
