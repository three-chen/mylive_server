import { AppDataSource } from '@/data-source';

import { User } from '@/entity/User';

export default class UserMapper {
    public static async listUsers() {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        console.log("UserMapper", users);
        return users;
    }

    public static async showUserDetail(id: number) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: id });

    }

    public static async updateUser() {
        const userRepository = AppDataSource.getRepository(User);
        // await userRepository.update();

    }

    public static async deleteUser() {
        const userRepository = AppDataSource.getRepository(User);
        // await userRepository.delete();

    }
}