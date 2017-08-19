/* eslint-disable */
const Koa = require('koa');
const send = require('koa-send');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
  }
});

app.use(async (ctx) => {
  let path = ctx.path;
  if (path === '/') {
    path = 'index.html';
  }
  await send(ctx, path, { root: __dirname });
});

app.listen(8090);

console.log('API 文档服务器以运行在 http://localhost:8090');
