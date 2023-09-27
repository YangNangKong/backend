import { Request, Response } from 'express';
import User from '../models/User'; // User 모델 가져오기

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
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Read (GET) all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};