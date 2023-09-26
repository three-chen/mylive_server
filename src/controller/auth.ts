import { Context } from 'koa'

import AuthService from '@/service/auth'
import UserService from '@/service/user'

import LoginInfo from '@/service/data/LoginInfo'
import UserInfo from '@/service/data/UserInfo'

class AuthController {
  public async postLogin(ctx: Context) {
    const loginInfo: LoginInfo = ctx.request.body

    const user = await UserService.getUserByEmailWhenLogin(loginInfo.email)
    if (!user) {
      ctx.code = 401
      ctx.body = 'User not found'
    } else {
      const equal = await AuthService.verifyPassword(loginInfo.password, user.password)
      if (equal) {
        const token = AuthService.jwtSign(user.id)

        ctx.code = 200
        ctx.body = { token: token }
      } else {
        ctx.code = 401
        ctx.body = 'Password is wrong'
      }
    }
  }

  public async postRegister(ctx: Context) {
    const userInfo: UserInfo = ctx.request.body

    const user = await UserService.getUserByEmail(userInfo.email)
    if (!user) {
      const newUser = await UserService.createUser(userInfo)
      if (newUser) {
        ctx.code = 200
        ctx.body = newUser
      } else {
        ctx.code = 500
        ctx.body = 'Server error'
      }
    } else {
      ctx.code = 409
      ctx.body = 'User already exists'
    }
  }
}

export default new AuthController()
