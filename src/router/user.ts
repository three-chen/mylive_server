import Router from '@koa/router'

import UserController from '@/controller/user'

const userRouter = new Router({ prefix: '/users' })

// users 相关的路由
userRouter.get('/', UserController.listUsers)
userRouter.get('/:id', UserController.showUserDetail)
userRouter.put('/:id', UserController.updateUser)
userRouter.delete('/:id', UserController.deleteUser)

export default userRouter
