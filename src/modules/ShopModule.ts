import { Request } from 'express';
import Shop from '../models/Shop';
import { ShopResource } from '../resources/ShopResource';

class ShopModule {
    static async create(req: Request) {
        try {
            const {
                shop_name,
                phone_number,
                address,
                detail_address,
            } = req.body;

            const shop = await Shop.create({
                shop_name,
                phone_number,
                address,
                detail_address,
            });

            // TODO: resource 추가
            return new ShopResource(shop);
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }

    static async get(shopId: string) {
        const shop = await Shop.findByPk(shopId);
        if (!shop) { return { message: '매장을 찾을 수 없습니다.' }; }

        return new ShopResource(shop);
    }
}

export default ShopModule;