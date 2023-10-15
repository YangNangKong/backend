import { Request } from 'express';
import TablingList from '../models/TablingList';

class TablingModule {
    static async create(req: Request) {
        try {
            const {
                shop_id,
                tabling_type,
                phone_number,
            } = req.body;

            const table_management = await TablingList.create({
                shop_id,
                tabling_type,
                phone_number,
            });
            
            // TODO: resource 추가
            return table_management;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }
}

export default TablingModule;