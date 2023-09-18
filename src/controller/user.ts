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
    ctx.body = `UpdateUser controller with ID = ${ctx.params.id}`
  }

  public async deleteUser(ctx: Context) {
    ctx.body = `DeleteUser controller with ID = ${ctx.params.id}`
  }
}

export default new UserController()
