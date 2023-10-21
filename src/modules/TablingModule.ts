import { Request } from 'express';
import TablingList from '../models/TablingList';

class TablingModule {
    // complete, waiting, run

    static async create(req: Request) {
        try {
            const {
                shop_id,
                tabling_type,
                phone_number,
            } = req.body;

            const tablingList = await TablingList.create({
                shop_id,
                tabling_type,
                phone_number,
            });

            // TODO: resource 추가
            return tablingList;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }

    static async get(req: Request) {
        try {
            const {
                shop_id,
                tabling_type,
            } = req.body;

            const tablingList = await TablingList.findAll({
                where: {
                    shop_id: shop_id,
                    tabling_type: tabling_type,
                },
            });

            // TODO: resource 추가
            return tablingList;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }

    static async update(req: Request) {
        try {
            const {
                id,
                tabling_type,
            } = req.body;

            const tablingList = await TablingList.findByPk(id);
            if (!tablingList) {
                throw new Error("리스트를 찾을 수 없습니다.");
            }

            await tablingList.update({ tabling_type: tabling_type });
            // TODO: resource 추가
            return tablingList;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }

    static async callCustomer(req: Request) {
        try {
            const {
                id,
            } = req.body;

            const tablingList = await TablingList.findByPk(id);
            if (!tablingList) {
                throw new Error("리스트를 찾을 수 없습니다.");
            }

            // TODO: 카톡메시지 보내는 로직 추가

            // TODO: resource 추가
            return tablingList;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }
}

export default TablingModule;