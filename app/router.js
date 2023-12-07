const Router = require('koa-router');

const router = new Router();

const RoleController = require('../controllers/v1/user');
const user = new RoleController();

/**
 * 用户
 */
router.post('/user/login', user.login);
router.post('/user/refresh', user.refresh);

module.exports = router;
