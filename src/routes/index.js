/**
 * 路由主入口
 * Create By zhuamng
 */

import Router from 'koa-router';
import demo from './demo/index';
import { userAuthentication } from '../middlewares/authentication';
import jsonBody from '../middlewares/jsonBody';

const router = new Router();

router
// 解析用户授权数据
.use(userAuthentication())
// parse json body
.use(jsonBody());

router.use('/demo',
  demo.routes(), demo.allowedMethods(),
  // homePage.routes(), homePage.allowedMethods(), 可以在同一个路由下挂载多个子路由
);

export default router;
