import { Request, Response } from 'express';
import { UserResource } from '../resources/UserResource';
import { validationResult } from 'express-validator';
import ShopModule from '../modules/ShopModule';

class ShopController {

    // Create (POST) a new shop
    static async createShop(req: Request, res: Response) {
        // TODO: validation 체크 추가

        try {
            const shopData = await ShopModule.create(req);
            res.status(201).json(shopData);
        } catch (error) {
            res.status(500).json({ error: '매장 생성에 실패하였습니다.' });
        }
    };
}

export default ShopController;