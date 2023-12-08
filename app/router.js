const Router = require('koa-router');

const router = new Router();

const RoleController = require('../controllers/v1/user');
const user = new RoleController();

/**
 * 用户
 */
router.post('/user/login', user.login);
router.post('/user/create', user.create);
router.post('/user/update', user.update);
router.post('/user/delete', user.delete);
router.post('/user/refreshToken', user.refreshToken);
router.post('/user/findAll', user.findAll);
router.post('/user/findOne', user.findOne);
router.get('/user/userInfo', user.userInfo);

module.exports = router;
