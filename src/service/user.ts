import UserMapper from '@/mapper/user';

export default class UserService {
    public static async listUsers() {

        return UserMapper.listUsers();
    }

    public static async showUserDetail(id: number) {

        return UserMapper.showUserDetail(id);
    }

    public static async updateUser() {

        return UserMapper.updateUser();
    }

    public static async deleteUser() {

        return UserMapper.deleteUser();
    }
}