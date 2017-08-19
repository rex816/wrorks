import coBody from 'co-body';

/**
 * 返回用于解析 json body 的中间价
 * @param  {Object} options co-body 选项，详细设置参考： https://github.com/cojs/co-body
 * @return {Funcion}        中间件函数
 */
export default function jsonBody(options) {
  const opts = options || { strict: true };
  return (ctx, next) => {
    if (ctx.method === 'GET' || ctx.method === 'DELETE') {
      return next();
    }
    if (!ctx.is('application/json')) {
      return next();
    }
    return coBody.json(ctx.req, opts).then((body) => {
      ctx.request.body = body;
      return next();
    }, err => next(err));
  };
}
