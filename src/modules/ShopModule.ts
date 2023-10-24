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

            return new ShopResource(shop);
        } catch (error) {
            throw error;
        }
    }

    static async get(shop_id: string) {
        const shop = await Shop.findByPk(shop_id);
        if (!shop) { return { message: '매장을 찾을 수 없습니다.' }; }

        return new ShopResource(shop);
    }

    static async open(shop_id: string) {
        const shop = await Shop.findByPk(shop_id);
        if (!shop) { return { message: '매장을 찾을 수 없습니다.' }; }

        shop.open_date = new Date();
        shop.closed_date = null;
        shop.save();

        return new ShopResource(shop);
    }

    static async close(shop_id: string) {
        const shop = await Shop.findByPk(shop_id);
        if (!shop) { return { message: '매장을 찾을 수 없습니다.' }; }

        shop.closed_date = new Date();
        shop.save();

        return new ShopResource(shop);
    }
}

export default ShopModule;