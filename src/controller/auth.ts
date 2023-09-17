import { Context } from 'koa'

class AuthController {
  public async login(ctx: Context) {
    ctx.body = 'Login controller'
  }

  public async register(ctx: Context) {
    ctx.body = 'Register controller'
  }
}

export default new AuthController()
