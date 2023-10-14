import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UserToken from '../models/UserToken';
dotenv.config();

const secretKey = process.env.TOKENSECRETKEY || 'undefined';

export function generateToken(data: any): string {
    return jwt.sign(data, secretKey, { expiresIn: '6h' });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    // TODO: 미들웨어에 있어야 하는데 어떻게 처리할지 고민필요
    let token = req.headers.authorization; // 요청 헤더에서 토큰을 가져옵니다.

    if (!token) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
    }

    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
        }
        // 토큰에서 해독한 정보를 요청 객체에 저장하여 라우트에서 사용할 수 있습니다.
        // req.user = decoded;

        const userToken = await UserToken.findOne({ where: { token: token } });
        if (!userToken) {
            return res.status(403).json({ message: '다른 환경에서 로그인 되었습니다.' });
        }

        next();
    });
}