/**
 * 对数据库中返回的numeric字段进行精确加法运算
 * @param {String} num1 数字1
 * @param {String} num2 数字2
 * @returns {string} 计算结果
 */
export function numericAdd(num1, num2) {
  let r1;
  let r2;
  try {
    r1 = num1.split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = 10 ** Math.max(r1, r2);
  const result = ((num1 * m) + (num2 * m)) / m;
  return result.toString();
}
