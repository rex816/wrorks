/* eslint-disable import/prefer-default-export */

import crypto from 'crypto';

/**
 * 使用 SHA1 对提供的文本进行加密
 * @param  {string} text 要加密的文本
 * @return {string}      加密后的 16 进制字符串
 */
export function sha1(text) {
  const sha = crypto.createHash('sha1');
  sha.update(text);
  return sha.digest('hex');
}
