//  业务层 实现数据层model到操作层controller的耦合封装
// controllers 数据库操作
const User = require('../modules/userModel');

class UserService {
	async addUser() {
		const addUserResult = await User.create({
			username: '张三',
			password: '123456',
			avatar: 'http://aa.png',
			status: 0,
			last_login: new Date().getTime(),
		});

		if (addUserResult) {
			console.log(addUserResult.dataValues);
		}

		try {
			// await User.sync(); // 在没有表时自动创建
			console.log('添加成功');
		} catch (error) {
			console.log('添加失败\n', error);
			return Promise.reject(error);
		}
	}
}

module.exports = UserService;
