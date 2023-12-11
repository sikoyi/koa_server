const jwt = require('jsonwebtoken');
const config = require('../../../config/config.default');
const UserService = require('../../services/user');
const userService = new UserService();

// mock数据
const users = [{ username: 'admin', password: '123456' }];

/**
 * @controller 用户 user
 */
class RoleController {
	/**
	 * token刷新
	 * @param {*} ctx
	 */
	async refreshToken(ctx) {
		let { authorization } = ctx.headers;

		const token = authorization.split(' ')[1];
		const data = jwt.verify(token, config.jwt.secret);
		console.log('data', data);
		// todo 需要增加用户校验 - 待实现

		const accessToken = jwt.sign(
			{
				username: data.username,
			},
			config.jwt.secret,
			{
				expiresIn: '0.1h',
			}
		);

		const refreshToken = jwt.sign(
			{
				username: data.username,
			},
			config.jwt.secret,
			{
				expiresIn: '7d',
			}
		);

		if (!data) {
			ctx.body = {
				code: 108,
				data: null,
				message: '请重新登录',
			};
		} else {
			ctx.body = {
				code: 0,
				data: {
					accessToken,
					refreshToken,
				},
				message: 'ok',
			};
		}
	}

	/**
	 * 用户登录
	 * @param {*} ctx
	 * @returns
	 */
	async login(ctx) {
		const { username, password } = ctx.request.body;
		if (!username) {
			ctx.body = {
				code: 101,
				data: null,
				message: '用户名不能为空',
			};
			return;
		}

		const userInfo = users.find((user) => user.username === username);
		if (!userInfo) {
			ctx.body = {
				code: 101,
				data: null,
				message: '用户不存在',
			};
			return;
		}

		if (userInfo.password !== password) {
			ctx.body = {
				code: 101,
				data: null,
				message: '用户名或密码输入错误',
			};
			return;
		}

		const accessToken = jwt.sign(
			{
				username: userInfo.username,
			},
			config.jwt.secret,
			{
				expiresIn: '0.1h',
			}
		);

		const refreshToken = jwt.sign(
			{
				username: userInfo.username,
			},
			config.jwt.secret,
			{
				expiresIn: '7d',
			}
		);

		ctx.body = {
			code: 0,
			data: {
				accessToken,
				refreshToken,
			},
			message: '',
		};
	}

	/**
	 * 退出登录
	 * @param {*} ctx
	 */
	async logout(ctx) {}

	/**
	 * 获取所有用户信息
	 * @param {*} ctx
	 */
	async findAll(ctx) {}

	/**
	 * 获取 指定用户
	 * @param {*} ctx
	 */
	async findOne(ctx) {}

	/**
	 * 获取用户信息
	 * @param {*} ctx
	 */
	async userInfo(ctx) {}

	/**
	 * 创建用户信息
	 * @param {*} ctx
	 */
	async create(ctx) {
		try {
			const result = await userService.addUser();
			ctx.body = {
				code: 0,
				data: null,
				message: '操作成功',
			};
		} catch (error) {
			ctx.body = {
				code: 0,
				data: null,
				message: `操作失败, ${error.message}`,
			};
		}
	}

	/**
	 * 更新用户信息
	 * @param {*} ctx
	 */
	async update(ctx) {}

	/**
	 * 删除用户信息
	 * @param {*} ctx
	 */
	async delete(ctx) {}
}

module.exports = RoleController;
