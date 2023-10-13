import { Context } from 'koa'

import AuthService from '@/service/auth'
import UserService from '@/service/user'

import type LoginInfo from '@/service/data/auth/LoginInfo'
import type LoginR from '@/service/data/auth/LoginR'
import type UserInfo from '@/service/data/UserInfo'
import RegisterR from '@/service/data/auth/RegisterR'

class AuthController {
  public async postLogin(ctx: Context) {
    const loginInfo: LoginInfo = ctx.request.body


    const user = await UserService.getUserByEmailWhenLogin(loginInfo.email)
    if (!user) {
      ctx.status = 401
      ctx.body = 'User not found'
    } else {
      const equal = await AuthService.verifyPassword(loginInfo.password, user.password)
      if (equal) {
        const token = AuthService.jwtSign(user.id)

        const loginR: LoginR = {
          username: user.name,
          useremail: user.email,
          token: token,
        }
        ctx.body = loginR
        ctx.status = 200
      } else {
        ctx.body = 'Password is wrong'
        ctx.status = 401
      }
    }
  }

  public async postRegister(ctx: Context) {
    const userInfo: UserInfo = ctx.request.body

    const user = await UserService.getUserByEmail(userInfo.email)
    if (!user) {
      const newUser = await UserService.createUser(userInfo)
      if (newUser) {
        const registerR: RegisterR = {
          username: newUser.name,
          useremail: newUser.email,
        }
        ctx.body = registerR
        ctx.status = 200
      } else {
        ctx.body = 'Server error'
        ctx.status = 500
      }
    } else {
      ctx.body = 'User already exists'
      ctx.status = 409
    }
  }
}

export default new AuthController()
