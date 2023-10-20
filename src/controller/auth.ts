import { Context } from 'koa'

import AuthService from '@/service/auth/auth'
import UserService from '@/service/user'

import type LoginInfo from '@/service/data/auth/LoginInfo'
import type LoginR from '@/service/data/auth/LoginR'

import type UserInfo from '@/service/data/UserInfo'
import RegisterR from '@/service/data/auth/RegisterR'

import R from '@/service/data/R'

class AuthController {
  public async postLogin(ctx: Context) {
    const loginInfo: LoginInfo = ctx.request.body

    const user = await UserService.getUserByEmailWhenLogin(loginInfo.email)
    if (!user) {
      const r = new R(false, null, 'User not found')
      ctx.body = r
      ctx.status = 401
    } else {
      const equal = await AuthService.verifyPassword(loginInfo.password, user.password)
      if (equal) {
        const token = AuthService.jwtSign(user)

        const auth = AuthService.getUserPermission(user)
        const loginR: LoginR = {
          username: user.name,
          useremail: user.email,
          token: token,
          auth: auth
        }
        const r = new R(true, loginR, null)
        ctx.body = r
        ctx.status = 200
      } else {
        const r = new R(false, null, 'Password is wrong')
        ctx.body = r
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
          useremail: newUser.email
        }

        const r = new R(true, registerR, null)
        ctx.body = r
        ctx.status = 200
      } else {
        const r = new R(false, null, 'Server error')
        ctx.body = r
        ctx.status = 500
      }
    } else {
      const r = new R(false, null, 'User already exists')
      ctx.body = r
      ctx.status = 409
    }
  }

  public async getUserPermission(ctx: Context) {
    const email: string = ctx.request.body

    const user = await UserService.getUserByEmailWhenLogin(email)
    if (!user) {
      const r = new R(false, null, 'User not found')
      ctx.body = r
      ctx.status = 401
    } else {
      const auth = AuthService.getUserPermission(user)
      const r = new R(true, auth, null)
      ctx.body = r
      ctx.status = 200
    }
  }
}

export default new AuthController()
