/* eslint-disable no-console */
import Koa from 'koa';
import path from 'path';
import https from 'https';
import fs from 'fs';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import api from './routes';
import logger from './utils/logger';
import config from './config';

const app = new Koa();
const IS_DEV = process.env.NODE_ENV !== 'production';

// logger
if (IS_DEV) {
  app.use(koaLogger());
}

// 添加 CORS 支持，仅限开发模式下使用，主要用于 swagger-ui 测试 API。
if (IS_DEV) {
  app.use((ctx, next) => {
    ctx.res.setHeader('Access-Control-Allow-Origin', '*');
    ctx.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    ctx.res.setHeader('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, accept, ti, sign');
    return next();
  });
}

// 设置当前响应的状态码为 ctx.body.statusCode 设定的值，不设置则表示默认为 200
app.use(async (ctx, next) => {
  await next();
  if (ctx.body && ctx.body.statusCode) {
    ctx.status = ctx.body.statusCode;
    delete ctx.body.statusCode;
  }
});

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      success: false,
      message: err.message || '请求失败',
    };
    if (!err.statusCode && !err.status) {
      logger.error(err);
    }
  }
});

// routes
const router = new Router();
router.use(`/${config.version}`, api.routes(), api.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || config.port;
if (IS_DEV) {
  // 开发模式使用 HTTP
  app.listen(port);
} else {
  // 生产模式使用 HTTPS
  https.createServer({
    key: fs.readFileSync(path.join(__dirname, `../ssl/${config.ssl.key}`)),
    cert: fs.readFileSync(path.join(__dirname, `../ssl/${config.ssl.pem}`)),
  }, app.callback()).listen(port);
}

console.log(`${config.name} ${port} 端口，当前使用 ${IS_DEV ? 'HTTP' : 'HTTPS'}！`);
