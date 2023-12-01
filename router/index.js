const Router = require('koa-router');
const userRouter = require('./user');
const goodsRouter = require('./goods');

const router = new Router();

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/goods', goodsRouter.routes(), goodsRouter.allowedMethods());

module.exports = router;
