/**
 * 项目的配置信息
 * Create By zhumang
 */

module.exports = {
  name: 'API-Demo 服务器',
  port: 3000,
  version: 'v1',
  ssl: {
    key: 'domain_name.key',
    pem: 'domain_name.pem',
  },
  db: {
    host: 'http://123.123.213.123',
    port: 1234,
    user: 'db-admin',
    pass: 'db-admin',
    dbName: 'db-name',
  },
};
