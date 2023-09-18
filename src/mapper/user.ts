import { AppDataSource } from '@/data-source'

import { User } from '@/entity/User'
import UserInfo from '@/service/data/UserInfo'

export default class UserMapper {
  public static async listUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    console.log('UserMapper', users)
    return users
  }

  public static async showUserDetail(id: number): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: id })

    console.log('UserMapper', user)
    return user
  }

  public static async updateUser(id: number, userInfo: UserInfo) {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: id })

    user.name = userInfo.name
    user.email = userInfo.email
    user.password = userInfo.password

    return await userRepository.save(user)
  }

  public static async deleteUser(id: number) {
    const userRepository = AppDataSource.getRepository(User)
    const deletedUser = await userRepository.findOneBy({ id: id })

    return await userRepository.remove(deletedUser)
  }
}
