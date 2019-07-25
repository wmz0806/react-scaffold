## 项目介绍
此项目乃固守麦卡项目创建脚手架，采用react全家桶与koa同构开发

Node版本v8.0.0+ 或 v10.0.0+ 和 webpack v4.0.0+


## 开始使用
1）第一步 安装依赖
```Node.js
npm install
```
2）第二步 构建dll
```Node.js
npm run build:dll 
```
3）第三步 运行
```Node.js
npm run dev
```

## 命令介绍

启动生产环境
```Node.js
npm run start 
```

启动开发环境
```Node.js
npm run dev 
```

构建dll
```Node.js
npm run build:dll 
```

查看开发环境的构建文件结构
```Node.js
npm run build:dev 
```

编译生产环境需要的静态文件
```Node.js
npm run build:prod
```

编译服务端渲染需要的静态文件（根据需求开关服务器端渲染）
```Node.js
npm run build:ssr
```

同时执行build:prod和build:ssr
```Node.js
npm run build:all
```
