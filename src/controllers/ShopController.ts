import { Request, Response } from 'express';
import { UserResource } from '../resources/UserResource';
import { validationResult } from 'express-validator';
import ShopModule from '../modules/ShopModule';
import * as ShopValidation from '../validations/ShopValidation';

class ShopController {

    // Create (POST) a new shop
    static async createShop(req: Request, res: Response) {
        const validationChain = ShopValidation.create;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const shopData = await ShopModule.create(req);
            res.status(201).json(shopData);
        } catch (error) {
            res.status(500).json({ error: '매장 생성에 실패하였습니다.' });
        }
    };
}

export default ShopController;