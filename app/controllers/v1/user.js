const jwt = require('jsonwebtoken');

const config = require('../../../config/config.default');
const UserService = require('../../services/user');
const userService = new UserService();

/**
 * @controller 用户 user
 */
class RoleController {
  /**
   * token刷新
   * @param {*} ctx
   */
  async refreshToken(ctx) {
    try {
      let { authorization } = ctx.headers;

      const token = authorization.split(' ')[1];
      console.log('token', token);
      const data = jwt.verify(token, config.jwt.secret);
      // 需要删除解出来的 iat exp 不然重新加密会出问题
      delete data.iat;
      delete data.exp;
      // todo 需要增加用户校验 - 待实现

      const accessToken = jwt.sign(data, config.jwt.secret, {
        expiresIn: '1h',
      });

      const refreshToken = jwt.sign(data, config.jwt.secret, {
        expiresIn: '7d',
      });

      ctx.body = {
        code: 0,
        data: {
          accessToken,
          refreshToken,
        },
        message: '操作成功',
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        data: null,
        message: error,
      };
    }
  }

  /**
   * 用户登录
   * @param {*} ctx
   * @returns
   */
  async login(ctx) {
    try {
      const { username, password } = ctx.request.body;
      const result = await userService.login(username, password);
      const userInfo = {
        id: result.id,
        nickname: result.nickname,
        avatar: result.avatar,
      };

      // 短token
      const accessToken = jwt.sign(userInfo, config.jwt.secret, {
        expiresIn: '1h',
      });

      // 长token
      const refreshToken = jwt.sign(userInfo, config.jwt.secret, {
        expiresIn: '7d',
      });

      ctx.body = {
        code: 200,
        data: {
          accessToken,
          refreshToken,
        },
        message: '登录成功',
      };
    } catch (error) {
      ctx.body = {
        code: 101,
        data: null,
        message: typeof error === 'object' ? error.message : error,
      };
    }
  }

  /**
   * 退出登录
   * @param {*} ctx
   */
  async logout(ctx) {
    ctx.body = {
      code: 0,
      data: null,
      message: '退出登录成功',
    };
  }

  /**
   * 获取所有用户信息
   * @param {*} ctx
   */
  async findAll(ctx) {
    const result = await userService.findAll();

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  /**
   * 获取 指定用户
   * @param {*} ctx
   */
  async findOne(ctx) {}

  /**
   * 获取用户信息
   * @param {*} ctx
   */
  async userInfo(ctx) {
    try {
      const { authorization } = ctx.request.headers;
      const token = authorization.split(' ')[1];
      const userInfo = jwt.verify(token, config.jwt.secret);

      delete userInfo.iat;
      delete userInfo.exp;

      ctx.body = {
        code: 200,
        data: {
          menus: [], // 路由信息
          permissions: [], // 权限
          user: userInfo, // 用户信息
          roles: ['super_admin'], // 角色身份
        },
        message: '操作成功',
      };
    } catch (error) {
      console.log('userInfo Error: ', error);
      ctx.body = {
        code: 500,
        data: null,
        message: typeof error === 'object' ? error.message : error,
      };
    }
  }

  /**
   * 创建用户信息
   * @param {*} ctx
   */
  async create(ctx) {
    try {
      const requestBody = ctx.request.body;
      await userService.addUser(requestBody);
      ctx.body = {
        code: 0,
        data: null,
        message: '操作成功',
      };
    } catch (error) {
      ctx.body = {
        code: 0,
        data: null,
        message: typeof error === 'object' ? error.message : error,
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
