// 一定要将import './init';放到最开头,因为它里面初始化了路径别名
import './init/alias'

import { AppDataSource } from '@/data-source'
import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import 'reflect-metadata'

import { loggerFactory } from '@/middleware/logger'
import authRouter from '@/router/auth'
import userRouter from '@/router/user'

// 初始化 Koa 应用实例
const app = new Koa()

AppDataSource.initialize()
  .then(async () => {
    // 注册中间件
    app.use(loggerFactory())
    app.use(cors())
    app.use(bodyParser())

    // 响应用户请求
    app.use(authRouter.routes()).use(authRouter.allowedMethods())
    app.use(userRouter.routes()).use(userRouter.allowedMethods())
  })
  .catch(err => {
    console.log(err)
  })

// 运行服务器
app.listen(3000)
