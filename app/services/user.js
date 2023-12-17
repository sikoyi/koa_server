//  业务层 实现数据层model到操作层controller的耦合封装
// controllers 数据库操作
const User = require("../modules/userModel");

class UserService {
  async addUser(data) {
    // bulkCreate 可以批量创建和插入多个实例 传入数组
    if (!data.username) return Promise.reject(`'username' is not empty`);
    if (!data.nickname) return Promise.reject(`'nickname' is not empty`);
    if (!data.password) return Promise.reject(`'password' is not empty`);
    if (!data.avatar) return Promise.reject(`'avatar' is not empty`);

    const userInfo = Object.assign({ status: 0, last_login: Date.now() }, data);
    const addUserResult = await User.create(userInfo);

    if (addUserResult) {
      console.log(addUserResult.dataValues);
    }

    try {
      console.log("添加成功");
    } catch (error) {
      console.log("添加失败\n", error);
      return Promise.reject(error);
    }
  }

  /**
   * 查看所有
   */
  async findAll() {
    try {
      const result = await User.findAll();
      if (result) {
        return result;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * 查找指定用户
   * @param {*} id
   */
  async findOne(id) {
    const result = await User.findAll({
      where: {
        id,
      },
    });
    console.log("finOne", result);
    if (result) {
      return result;
    }
  }

  /**
   * 登录
   * @param {*} id
   */
  async login(username, password) {
    try {
      if (!username) return Promise.reject(`账号不能为空`);
      if (!password) return Promise.reject(`密码不能为空`);

      const result = await User.findAll({
        where: {
          username,
          password,
        },
      });
      if (result) {
        return result;
      }
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
}

module.exports = UserService;
