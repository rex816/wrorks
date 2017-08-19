module.exports = {
  info: {
    title: 'Demo API 文档',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: [
    'http',
  ],
  basePath: '/v1',
  produces: [
    'application/json',
  ],
  tags: [
    {
      name: 'Demo',
      description: 'Demo相关API',
    },
  ],
  definitions: {
    SuccessResult: {
      type: 'object',
      required: ['success'],
      properties: {
        success: {
          type: 'boolean',
          description: '操作成功时，该值为 `true`',
        },
      },
      example: {
        success: true,
      },
    },
    FailureResult: {
      type: 'object',
      required: ['success', 'message'],
      properties: {
        success: {
          type: 'boolean',
          description: '操作失败时，该值为 `false`',
        },
        message: {
          type: 'string',
          description: '错误消息',
        },
      },
      example: {
        success: false,
        message: '错误消息',
      },
    },
  },
};
