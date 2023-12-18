//  业务层 实现数据层model到操作层controller的耦合封装
// controllers 数据库操作
const argon2 = require('argon2');
const User = require('../modules/userModel');

class UserService {
  /**
   * 创建用户
   * @param {*} data
   * @returns
   */
  async addUser(data) {
    // bulkCreate 可以批量创建和插入多个实例 传入数组
    if (!data.username) return Promise.reject(`'username' is not empty`);
    if (data.username.length < 3) return Promise.reject(`用户名长度不能小于3位`);
    if (data.username.length > 10) return Promise.reject(`用户名长度不能大于10位`);

    if (!data.nickname) return Promise.reject(`'nickname' is not empty`);

    if (!data.password) return Promise.reject(`'password' is not empty`);
    if (data.password.length < 6) return Promise.reject(`密码长度不能小于6位`);
    if (data.password.length > 15) return Promise.reject(`密码长度不能大于15位`);
    // 缺少密码正则

    if (!data.avatar) return Promise.reject(`'avatar' is not empty`);

    const imgUrl = /^(http|https):\/\/([\w.]+\/?)\S*(png|jpg|jpeg|gif)$/gi;
    if (imgUrl.exec(data.avatar)) return Promise.reject(`头像 url 异常: ${data.avatar}`);

    // 如果已经存在则不再创建
    const isExits = await User.findAll({
      where: {
        username: data.username,
      },
      limit: 1,
    });
    if (isExits.length > 0) return Promise.reject(`${data.username} 用户已存在`);

    // 对密码进行加密
    data.password = await argon2.hash(data.password, {
      type: argon2.argon2d,
      memoryCost: 2 ** 16,
      hashLength: 30,
    });

    const userInfo = Object.assign({ status: 0, last_login: Date.now() }, data);
    try {
      const user = await User.create(userInfo);

      if (user instanceof User) {
        return Promise.resolve('添加成功');
      } else {
        return Promise.reject('添加用户异常:', user);
      }
    } catch (error) {
      console.log('添加失败\n', error);
      return Promise.reject(error);
    }
  }

  /**
   * 查看所有
   */
  async findAll() {
    try {
      const result = await User.findAll();
      if (result.length > 0) {
        return result;
      }
      return Promise.reject('当前无用户');
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
      limit: 1,
    });
    console.log('finOne', result);
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
      if (username.length < 3) return Promise.reject(`用户名长度不能小于3位`);
      if (username.length > 10) return Promise.reject(`用户名长度不能大于10位`);

      if (!password) return Promise.reject(`密码不能为空`);
      if (password.length < 6) return Promise.reject(`密码长度不能小于6位`);
      if (password.length > 15) return Promise.reject(`密码长度不能大于15位`);

      const result = await User.findAll({
        where: {
          username,
        },
        limit: 1,
      });

      if (result.length > 0) {
        const userInfo = result[0];

        // 校验密码是否正确
        const isCorrect = await argon2.verify(userInfo.password, password);
        if (!isCorrect) return Promise.reject('密码错误');

        return Promise.resolve(result[0]);
      }

      return Promise.reject('账号或密码错误');
    } catch (error) {
      console.log(error);
      return Promise.reject(error.message);
    }
  }
}

module.exports = UserService;
