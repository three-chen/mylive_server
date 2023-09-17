import Router from '@koa/router'

import AuthController from '@/controller/auth'

const authRouter = new Router({ prefix: '/auth' })

// auth 相关的路由
authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)

export default authRouter
