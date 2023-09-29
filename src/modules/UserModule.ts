import { Request } from 'express';
import User from '../models/User';
import { UserResource } from '../resources/UserResource';

class UserModule {
    // constructor(parameters) {
    // }

    static async create(req: Request) {
        try {
            const {
                user_name,
                email,
                password,
                company_name,
                company_code,
                phone_number,
            } = req.body;

            const user = await User.create({
                user_name,
                email,
                password,
                company_name,
                company_code,
                phone_number,
            });
            await user.hashPassword(); // 비밀번호 암호화 메서드 호출
            await user.save(); // 암호화된 비밀번호로 저장

            return new UserResource(user)
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const users = await User.findAll();
            const userResources = users.map((user) => new UserResource(user));
            return userResources;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }
}

export default UserModule;