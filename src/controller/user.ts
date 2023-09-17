import { Context } from 'koa'

class UserController {
  public async listUsers(ctx: Context) {
    ctx.body = 'ListUsers controller'
  }

  public async showUserDetail(ctx: Context) {
    ctx.body = `ShowUserDetail controller with ID = ${ctx.params.id}`
  }

  public async updateUser(ctx: Context) {
    ctx.body = `UpdateUser controller with ID = ${ctx.params.id}`
  }

  public async deleteUser(ctx: Context) {
    ctx.body = `DeleteUser controller with ID = ${ctx.params.id}`
  }
}

export default new UserController()
