import { Request, Response } from 'express';
import { UserResource } from '../resources/UserResource';
import { validationResult } from 'express-validator';
import ShopModule from '../modules/ShopModule';
import * as ShopValidation from '../validations/ShopValidation';
import LogModule from '../modules/LogModule';
import { ShopResource } from '../resources/ShopResource';

class ShopController {
    
    static async getShop(req: Request, res: Response) {
        const shopId = req.params.shop_id;

        try {
            const shopData = await ShopModule.get(shopId);
            res.status(201).json(shopData);
        } catch (error) {
            res.status(500).json({ error: '매장 조회중 오류가 발생했습니다.' });
        }
    }

    // Create (POST) a new shop
    static async createShop(req: Request, res: Response) {
        const validationChain = ShopValidation.create;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        const log = await LogModule.create(req.ip, '매장등록', 'nangkong', req.body);
        try {
            const shopData = await ShopModule.create(req);
            LogModule.complete(log, shopData);
            res.status(201).json(shopData);
        } catch (error) {
            res.status(500).json({ error: '매장 생성에 실패하였습니다.' });
        }
    };
}

export default ShopController;