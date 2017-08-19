# Demo API with Nodejs

## 特性

-   基于[nodejs](https://github.com/nodejs/node)运行环境
-   基于[koa](https://github.com/koajs/koa) 框架
-   基于[react-router](https://github.com/ReactTraining/react-router) 路由。
-   基于[forever](https://github.com/foreverjs/forever) 后台运行。
-   使用ES6/7最新语法
-   脚本自动打包生成部署代码

## 更新日志

### 1.0.0

`2017-08-10`

-     搭建完成基本框架，添加demo示例。

## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /forever/        # forever命令脚本
├── /logs/           # 日志信息
├── /src/            # 项目源码目录
│ ├── /config/       # 项目主配置目录
| | └──index.js      # 主配置文件
│ ├── /db/           # 数据库操作目录
│ │ ├── /demo/       # 示例操作目录
| | | └── index.js   # 示例操作的代码
│ │ └── index.js     # 数据库基础相关配置
│ ├── /routes/       # 路由组件
| | ├── /demo/       # 示例路由目录
| | | └── index.js   # 示例路由代码
│ │ └── index.js     # 路由入口
│ ├── /externals/    # 第三方目录
│ ├── /middlewares/  # 中间件目录
│ │ ├── authentication.js  # 登录认证中间件
│ │ └── jsonBody.js  # 输出转json
│ ├── /utils/        # 工具函数目录
│ │ ├── crypto.js    # 加密函数
│ │ ├── logger.js    # 日志函数
│ │ ├── number.js    # 数据库返回number精确相加（postgres）
│ │ ├── paging.js    # 数据分页函数
│ │ └── validator.js # 路由参数验证函数
│ ├── server.js      # 入口文件（正式环境）
│ └── dev.server.js  # 入口文件（开发环境,babel动态编码）
├── /swagger-ui/     # api文档目录
│ └── server.js      # api文档服务端入口
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .eslintignore.js # Eslint忽略文件配置
└── .babelrc.js      # babelrc配置
└── .editorconfig.js # atom编辑器配置
└── .gitignore.js    # git忽略文件配置
└── swaggerDef.js    # api文档配置
```

文件夹命名说明:

-   components：组件（方法）为单位以文件夹保存，文件夹名组件首字母大写（如`DataTable`），方法首字母小写（如`layer`）,文件夹内主文件与文件夹同名，多文件以`index.js`导出对象（如`./src/components/Layout`）。
-   routes：页面为单位以文件夹保存，文件夹名首字母小写（特殊除外，如`UIElement`）,文件夹内主文件以`index.js`导出，多文件时可建立`components`文件夹（如`./src/routes/dashboard`），如果有子路由，依次按照路由层次建立文件夹（如`./src/routes/UIElement`）。

### 快速开始

克隆项目文件:

```bash
git clone https://github.com/zuiidea/antd-admin.git
```

进入目录安装依赖:

```bash
#开始前请确保没有安装npm
npm install
```

开发：

```bash
npm run dev # 只启动api服务器
打开 http://localhost:3000

npm run start # 启动api文档服务器和api服务器
打开 http://localhost:8090 # swaggerDef.js中配置API文档请求参数信息
```

构建：
[详情](https://github.com/zuiidea/antd-admin/issues/269)

```bash
npm run build

将会打包至dist/{version}目录 #package.json里version字段
```

代码检测：

```bash
npm run eslint
```

## FAQ

-   项目打包后如何部署？
