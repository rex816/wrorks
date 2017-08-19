/**
 * Demo 数据库操作示例
 * Create By zhumang
 */

import { dbPool, failureResult, successResult, isNotRaiseException } from './index';
import logger from '../../utils/logger';

/**
 * 查询指定id数据
 * @param  {Number} id 数据编号
 * @return {Promise}
 */
export async function getDemo({ id }) {
  const client = await dbPool.connect();
  try {
    const sql = `
      SELECT name, age FROM demo WHERE id = $1
    `;
    const { rows } = await client.query(sql, [id]);
    if (rows.length === 0) {
      client.release();
      return failureResult(null, '信息不存在');
    }

    const { name, age } = rows[0];
    client.release();
    return successResult({
      name,
      age,
    });
  } catch (err) {
    logger.error('查询信息发生错误', err);
    client.release(isNotRaiseException(err));
    return failureResult(err, '查询信息失败');
  }
}
