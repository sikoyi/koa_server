const jwt = require("jsonwebtoken");
const config = require("../../../config/config.default");
const UserService = require("../../services/user");
const userService = new UserService();

// mock数据
const users = [{ username: "admin", password: "123456" }];

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

    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, config.jwt.secret);
    console.log("data", data);
    // todo 需要增加用户校验 - 待实现

    const accessToken = jwt.sign(
      {
        username: data.username,
      },
      config.jwt.secret,
      {
        expiresIn: "0.1h",
      }
    );

    const refreshToken = jwt.sign(
      {
        username: data.username,
      },
      config.jwt.secret,
      {
        expiresIn: "7d",
      }
    );

    if (!data) {
      ctx.body = {
        code: 108,
        data: null,
        message: "请重新登录",
      };
    } else {
      ctx.body = {
        code: 0,
        data: {
          accessToken,
          refreshToken,
        },
        message: "ok",
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
      const userInfo = await userService.login(username, password);

      const accessToken = jwt.sign(
        {
          username: userInfo.username,
        },
        config.jwt.secret,
        {
          expiresIn: "0.1h",
        }
      );

      const refreshToken = jwt.sign(
        {
          username: userInfo.username,
        },
        config.jwt.secret,
        {
          expiresIn: "7d",
        }
      );

      ctx.body = {
        code: 200,
        data: {
          accessToken,
          refreshToken,
        },
        message: "登录成功",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 101,
        data: null,
        message: error,
      };
    }
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
    ctx.body = {
      code: 200,
      data: {
        username: "jack",
      },
    };
  }

  /**
   * 创建用户信息
   * @param {*} ctx
   */
  async create(ctx) {
    try {
      await userService.addUser(ctx.request.body);
      ctx.body = {
        code: 0,
        data: null,
        message: "操作成功",
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
