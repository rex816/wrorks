/**
 * Demo 路由实例
 * Create By zhuamng
 */
import Router from 'koa-router';
import validator, { object, string, number, validationError } from '../../utils/validator';
import { getDemo } from '../../db/demo';

const router = new Router();

/**
 * @swagger
 * /demo/{id}:
 *   get:
 *     tags:
 *       - Demo
 *     summary: API - GET
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         type: integer
 *     responses:
 *       200:
 *         description: 操作成功说明
 *       default:
 *         description: 操作失败说明
 *         schema:
 *           $ref: '#/definitions/FailureResult'
 */
router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = await getDemo({ id });
});


/**
 * @swagger
 * definitions:
 *   PostRequest:
 *     type: object
 *     required:
 *       - name
 *       - age
 *       - from
 *     properties:
 *       name:
 *         type: string
 *         description: 昵称
 *       age:
 *         type: number
 *         description: 年龄
 *       from:
 *         type: string
 *         description: 国籍
 *     example:
 *       name: 'Jessica'
 *       age: 25
 *       from: 'Korea'
 */
/**
 * @swagger
 * /demo:
 *   post:
 *     tags:
 *       - Demo
 *     summary: API - POST
 *     parameters:
 *       - name: parameterName
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/PostRequest'
 *     responses:
 *       200:
 *         description: 操作成功说明
 *       default:
 *         description: 操作失败说明
 *         schema:
 *           $ref: '#/definitions/FailureResult'
 */
router.post(
  '/',
  validator({
    body: object().keys({
      name: string().error(validationError('信息不能为为空')),
      age: number().min(1).error(validationError('年龄必须大于0')),
      from: string(),
    }),
  }),
  async (ctx) => {
    // 通常需要异步请求数据库返回的数据,使用 async/await
    // ctx.body = await dbOperate(ctx.request.body);
    ctx.body = { success: true };
  },
);

/**
 * @swagger
 * /demo/{id}:
 *   put:
 *     tags:
 *       - Demo
 *     summary: API - PUT
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: 操作成功说明
 *       default:
 *         description: 操作失败说明
 *         schema:
 *           $ref: '#/definitions/FailureResult'
 */
router.put('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = { success: true, name: 'new', age: id };
});

/**
 * @swagger
 * /demo/{id}:
 *   delete:
 *     tags:
 *       - Demo
 *     summary: API - DELETE
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: 操作成功说明
 *       default:
 *         description: 操作失败说明
 *         schema:
 *           $ref: '#/definitions/FailureResult'
 */
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;
  ctx.body = { success: true, id };
});

export default router;
