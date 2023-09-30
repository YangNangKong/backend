import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.TOKENSECRETKEY || 'undefined';

export function generateToken(data: any): string {
    const token = jwt.sign(data, secretKey, { expiresIn: '6h' });
    return `Bearer ${token}`;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization; // 요청 헤더에서 토큰을 가져옵니다.

    if (!token) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
    }
    
    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
        }
        // 토큰에서 해독한 정보를 요청 객체에 저장하여 라우트에서 사용할 수 있습니다.
        // req.user = decoded;
        next();
    });
}