import argon2 from 'argon2'

import { JWT_SECRET } from '@/constants'
import jwt from 'jsonwebtoken'

export default class AuthService {
  public static async verifyPassword(loginPassword: string, userPassword: string): Promise<Boolean> {
    console.log('loginPassword', loginPassword, 'userPassword', userPassword)

    return await argon2.verify(userPassword, loginPassword)
  }

  public static jwtSign(id: number): string {
    return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '7d' })
  }
}
