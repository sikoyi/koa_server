const Router = require('koa-router');

const userRouter = new Router();

// 登录
userRouter.post('/login', async (ctx) => {
	ctx.body = {
		code: 0,
		data: null,
		message: '',
	};
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
userRouter.post('/get', async (ctx) => {});

module.exports = userRouter;
