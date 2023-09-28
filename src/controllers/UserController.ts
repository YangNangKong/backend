import { Request, Response } from 'express';
import User from '../models/User'; // User 모델 가져오기
import { UserResource } from '../resources/UserResource';

// Create (POST) a new user
export const createUser = async (req: Request, res: Response) => {
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

        res.status(201).json(new UserResource(user));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Read (GET) all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        const userResources = users.map((user) => new UserResource(user));

        res.status(200).json(userResources);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};