import Router from '@koa/router'

import AuthController from '@/controller/auth'

const authRouter = new Router({ prefix: '/auth' })

// auth 相关的路由
authRouter.post('/login', AuthController.postLogin)
authRouter.post('/register', AuthController.postRegister)

export default authRouter
