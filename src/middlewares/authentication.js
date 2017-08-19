import { failureResult } from '../db';

/**
 * 用于解析请求用户登录授权信息的中间件。
 * 如果包含有效的登录授权，将会设置 ctx.key
 */
export function userAuthentication() {
  return async (ctx, next) => {
    const sign = ctx.headers.sign;
    const ti = ctx.headers.ti;
    if (ti && sign) {
      // eslint-disable-next-line
      const [key1, key2, key3] = new Buffer(ti, 'base64')
        .toString()
        .split('|')
        .map((num) => {
          const n = Number.parseInt(num, 10);
          return Number.isNaN(n) ? 0 : n;
        });
    }

    await next();
  };
}

/**
 * 用于检查用户是否已登录的中间件。
 * 如果没有登录立即终止请求并返回 401 错误。
 *
 * 使用示例：
 *
 * const router = new Router();
 *
 * // 用法 1：
 * // 针对整个 router 生效。
 * router.use(checkLogin());
 *
 * // 用法 2：
 * // 用法 1 是针对整个 router 生效，如果只想对其中某一个或少数的几个使用，
 * // 只需要在要使用的 route 上直接使用即可
 * router.get('/logout', checkLogin(), (ctx) => {
 *   // ...
 * });
 */
export function checkLogin() {
  return (ctx, next) => { // eslint-disable-line consistent-return
    if (ctx.key && ctx.key.field) {
      return next();
    }
    ctx.body = failureResult(null, '没有登录', 401);
  };
}
