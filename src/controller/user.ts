import { Context } from 'koa'

import UserService from '@/service/user'

class UserController {
  public async listUsers(ctx: Context) {
    const users = await UserService.listUsers()

    if (users) {
      ctx.body = users
      ctx.status = 200
    } else {
      ctx.body = '用户列表为空'
      ctx.status = 404
    }
  }

  public async showUserDetail(ctx: Context) {
    // 将ctx.params.id转换成number类型
    const id = Number(ctx.params.id)
    const user = await UserService.showUserDetail(id)

    if (user) {
      ctx.body = user
      ctx.status = 200
    } else {
      ctx.body = '用户列表为空'
      ctx.status = 404
    }
  }

  public async updateUser(ctx: Context) {
    // 将ctx.params.id转换成number类型
    const id = Number(ctx.params.id)
    const userInfo = ctx.request.body
    const updatedUser = await UserService.updateUser(id, userInfo)

    if (updatedUser) {
      ctx.status = 200
      ctx.body = updatedUser
    } else {
      ctx.status = 404
    }
  }

  public async deleteUser(ctx: Context) {
    // 将ctx.params.id转换成number类型
    const id = Number(ctx.params.id)
    const deletedUser = await UserService.deleteUser(id)

    if (deletedUser) {
      ctx.status = 200
      ctx.body = deletedUser
    } else {
      ctx.status = 404
    }
  }
}

export default new UserController()
