export * from 'koa-context-validator';
export { default } from 'koa-context-validator';

/**
 * 创建一个验证错误
 * @param  {String} message          错误消息
 * @param  {Number} [statusCode=400] 给客户端的 HTTP 响应状态码，默认为 400 。
 * @return {Error}                   创建的错误实例
 */
export function validationError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
