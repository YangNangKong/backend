import { Request, Response } from 'express';
import User from '../models/User'; // User 모델 가져오기
import { UserResource } from '../resources/UserResource';
import { validationResult } from 'express-validator';
import UserModule from '../modules/UserModule';
import * as UserValidation from '../validations/UserValidation';

class UserController {

    // Create (POST) a new user
    static async createUser(req: Request, res: Response) {
        // Validation 오류 체크
        const validationChain = UserValidation.create;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const userData = await UserModule.create(req);
            res.status(201).json(userData);
        } catch (error) {
            res.status(500).json({ error: '회원가입에 실패하였습니다.' });
        }
    };

    // Read (GET) all users
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await UserModule.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: '조회에 실패했습니다.' });
        }
    };

    static async login(req: Request, res: Response) {
        // Validation 오류 체크
        const validationChain = UserValidation.login;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const token = await UserModule.getToken(req);
            res.status(200).json({ token: token });
        } catch (error) {
            res.status(500).json({ error: '토큰발급에 실패했습니다.' });
        }
    }
}

export default UserController;