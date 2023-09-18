import UserMapper from '@/mapper/user'

import { User } from '@/entity/User'
import UserInfo from '@/service/data/UserInfo'

export default class UserService {
  public static async listUsers(): Promise<User[]> {
    return await UserMapper.listUsers()
  }

  public static async showUserDetail(id: number): Promise<User> {
    return await UserMapper.showUserDetail(id)
  }

  public static async updateUser(id: number, userInfo: UserInfo) {
    return await UserMapper.updateUser(id, userInfo)
  }

  public static async deleteUser(id: number) {
    return await UserMapper.deleteUser(id)
  }
}
