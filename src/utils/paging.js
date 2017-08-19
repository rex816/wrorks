/**
 * @typedef {object} PagingParameter  数据库分页查询参数
 * @property {Number} limit 数据库分页查询时使用的 limit 值
 * @property {Number} offset 数据库分页查询时使用的 offset 值
 */
/**
 * 根据指定的页数和每页返回记录数返回数据库分页需要的数据
 * @param  {Number|String} page        页数
 * @param  {Number|String} pageSize    每页返回的记录数
 * @param  {Number|String} [maxPageSize = 40] 每页记录数的最大值
 * @return {PagingParameter}  数据库分页查询参数
 */
export function parsePaging(page, pageSize, maxPageSize) {
  let ps = pageSize;
  let p = page;
  let mp = maxPageSize;
  if (typeof (p) !== 'number') {
    p = parseInt(p, 10);
  }
  if (typeof (ps) !== 'number') {
    ps = parseInt(ps, 10);
  }
  if (isNaN(p) || p < 1) {
    p = 1;
  }
  if (!mp || mp < 1) {
    mp = 40;
  }
  if (isNaN(ps) || ps > mp || ps < 1) {
    ps = mp;
  }
  return {
    limit: ps,
    offset: (p - 1) * ps,
  };
}
