# admin-nest

## 目标

学习，使用nest写一个admin项目的后端接口。

## 启动

## 1. 修改配置文件

* 本项目使用的是mysql数据库

* 修改 .env.example 中的配置文件

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

postgresql：数据库名称
johndoe：数据库登录的用户名
randompassword：数据库登录的密码
localhost:5432：数据库的地址链接
mydb：数据库软件中的database 名称
```

* 

## 2. 依赖安装

## 3. 数据库迁移

执行命令`npx prisma migrate dev`

### 4. 启动项目

执行命令`npm run dev`
