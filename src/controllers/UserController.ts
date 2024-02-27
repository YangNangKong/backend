import { Request, Response } from 'express';
import User from '../models/User'; // User 모델 가져오기
import { UserResource } from '../resources/UserResource';
import { validationResult } from 'express-validator';
import UserModule from '../modules/UserModule';
import * as UserValidation from '../validations/UserValidation';
import LogModule from '../modules/LogModule';

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

        const log = await LogModule.create(req.ip, '회원가입', req.body);
        try {
            const userData = await UserModule.create(req);
            LogModule.complete(log, userData);
            res.status(200).json(userData);
        } catch (error) {
            LogModule.error(log, error, 'error');
            res.status(500).json({ error: '회원가입에 실패하였습니다.' });
        }
    };

    static async getUser(req: Request, res: Response) {

        try {
            const user = await UserModule.find(req);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: '조회에 실패했습니다.' });
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

        const log = await LogModule.create(req.ip, '로그인', req.body);
        try {
            const result = await UserModule.getToken(req);
            LogModule.complete(log, null);
            result.status ? res.status(200).json(result) : res.status(401).json(result);
        } catch (error) {
            LogModule.error(log, error, 'error');
            res.status(500).json({ error: '로그인에 실패했습니다.' });
        }
    }
}

export default UserController;