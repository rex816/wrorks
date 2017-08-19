/**
 * 描述信息
 * Create By zhumang
 */
import { Pool } from 'pg';
import config from '../config';

/** 数据库错误代码常量，raise_exception : 'P0001' */
const RAISE_EXCEPTION = 'P0001';
/** 数据库错误代码常量，no_data_found : 'P0002' */
const ERR_NO_DATA_FOUND = 'P0002';

const NUMBER_REG = /^\d+\.\d+$/;

function isNumber(num) {
  const type = typeof num;
  if (type === 'number') {
    return true;
  }
  return type === 'string' && NUMBER_REG.test(num);
}

/**
 * 数据库连接池
 * @type {Pool}
 */
export const dbPool = process.env.NODE_ENV === 'production'
  ? new Pool({
    user: config.db.user,
    password: config.db.pass,
    host: config.db.host,
    database: config.db.dbName,
    port: config.db.port || 5432,
    max: 10,
    idleTimeoutMillis: 1000,
  })
  : new Pool({
    user: config.db.user,
    password: config.db.pass,
    host: config.db.host,
    database: config.db.dbName,
    port: config.db.port || 5432,
    max: 10,
    idleTimeoutMillis: 1000,
  });

/**
 * 用于生成数据库复合类型
 * @param  {Object}   value          复合类型对应的值
 * @param  {String[]} attributes     指定 value 中的所有属性名称，必须按照数据库中对应复合类型声明的顺序排列
 * @param  {String}   typeName       数据库复合类型的名称
 * @param  {Number}   [startIndex=1] 生成的复合类型数组中第一个参数在整个 SQL 中的索引，即 $n 中的n值
 * @return {Object} 返回可用于数据库字符串拼接的各项数据。
 *                  sqlFragment (string): 表示该复合类型数组的 SQL 语句片段；
 *                  paramValues (Array): 该复合类型数组对应的参数值列表；
 *                  endIndex (Number): 该复合类型的最后一个参数在整个 SQL 中的索引。
 */
export function complexRow(value, attributes, typeName, startIndex = 1) {
  if (!value) {
    return {
      sqlFragment: `NULL${typeName ? `::${typeName}` : ''}`,
      paramValues: [],
      endIndex: startIndex - 1,
    };
  }
  const paramValues = [];
  let start = startIndex;
  let row = '';
  for (const attr of attributes) { // eslint-disable-line
    row += `${row.length > 0 ? ',' : ''}$${start}`;
    paramValues.push((value[attr] === null || value[attr] === undefined) ? null : value[attr]);
    start += 1;
  }
  const sqlFragment = `ROW(${row})${typeName ? `::${typeName}` : ''}`;
  return { sqlFragment, paramValues, endIndex: start - 1 };
}

/**
 * 用于生成数据库复合类型数组
 * @param  {Object[]} values         复合类型对应的值
 * @param  {String[]} attributes     指定 values 中的所有属性名称，必须按照数据库中对应复合类型声明的顺序排列
 * @param  {String}   typeName       数据库复合类型的名称
 * @param  {Number}   [startIndex=1] 生成的复合类型数组中第一个参数在整个 SQL 中的索引，即 $n 中的n值
 * @return {Object} 返回可用于数据库字符串拼接的各项数据。
 *                  sqlFragment (string): 表示该复合类型数组的 SQL 语句片段；
 *                  paramValues (Array): 该复合类型数组对应的参数值列表；
 *                  endIndex (Number): 该复合类型的最后一个参数在整个 SQL 中的索引。
 */
export function complexRowArray(values, attributes, typeName, startIndex = 1) {
  if (!values) {
    return {
      sqlFragment: `NULL${typeName ? `::${typeName}` : ''}[]`,
      paramValues: [],
      endIndex: startIndex - 1,
    };
  }
  const paramValues = [];
  let sqlFragment = '';
  let start = startIndex;
  for (const val of values) { // eslint-disable-line
    let row = '';
    for (const attr of attributes) { // eslint-disable-line
      row += `${row.length > 0 ? ',' : ''}$${start}`;
      paramValues.push((val[attr] === null || val[attr] === undefined) ? null : val[attr]);
      start += 1;
    }
    sqlFragment += `${sqlFragment.length > 0 ? ',' : ''}ROW(${row})`;
  }
  const type = typeName ? `::${typeName}[]` : '';
  sqlFragment = `ARRAY[${sqlFragment}]${type}`;
  return { sqlFragment, paramValues, endIndex: start - 1 };
}

/**
 * 将地理位置坐标转换为对应的 SQL 值
 * @param  {Number|String} longitude 经度
 * @param  {Number|String} latitude  纬度
 * @return {String}                  SQL 字符串
 */
export function locationValueSQL({ longitude, latitude }) {
  if (isNumber(longitude) && isNumber(latitude)) {
    return `ST_GeometryFromText('POINT(${longitude} ${latitude})', 4326)`;
  }
  throw new Error('无效经纬度坐标');
}

/**
 * 判断当前抛出的错误不是数据库函数中手动抛出的 raise_exception 异常。
 * @param  {Error}  err 错误对象
 * @return {boolean}    如果不是数据库抛出的 raise_exception 异常返回 true 。
 */
export function isNotRaiseException(err) {
  return !(err && (err.code === RAISE_EXCEPTION || err.code === ERR_NO_DATA_FOUND));
}

/**
 * 返回一个 success 默认为 true 的成功结果值。
 * @param  {object} result 要返回的结果值
 * @return {object}        如果 result 没有指定 success 属性，将自动添加 success 属性，并且值为 true
 */
export function successResult(result) {
  return Object.assign({ success: true }, result);
}

/**
 * 返回一个 success 为 false 的失败结果值
 * @param  {Error}  err             数据库错误
 * @param  {String} defaultMessage  如果 err 不是数据库的 RAISE_EXCEPTION，则使用该文本作为失败消息
 * @param  {Number} [statusCode]    响应状态码。等 V2 版本的 API 完成后考虑是否要把这个参数删除掉。
 * @return {Object}                 返回一个失败结果值，包含 success 和 message 属性
 */
export function failureResult(err, defaultMessage, statusCode) {
  if (isNotRaiseException(err)) {
    const code = statusCode || 400;
    return { success: false, message: defaultMessage, statusCode: err ? 500 : code };
  }
  return { success: false, message: err.message || defaultMessage, statusCode: statusCode || 400 };
}
