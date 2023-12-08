//  业务层 实现数据层model到操作层controller的耦合封装
// controllers 数据库操作
const Model = require('sequelize').Model;

class UserService extends Model {}

module.exports = UserService;
