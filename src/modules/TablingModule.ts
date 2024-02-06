import { Request } from 'express';
import { Op } from 'sequelize';
import TablingList from '../models/TablingList';
import { SolapiMessageService } from 'solapi';
import * as dotenv from 'dotenv';
import Shop from '../models/Shop';
dotenv.config();

class TablingModule {
    // complete, waiting, run

    static async create(req: Request) {
        try {
            const {
                shop_id,
                tabling_type,
                phone_number,
                personnel,
            } = req.body;

            const tablingList = await TablingList.create({
                shop_id,
                tabling_type,
                phone_number,
                personnel,
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

            const shop = await Shop.findByPk(shop_id);
            if (shop && (shop.open_date !== null)) {
                const tablingList = await TablingList.findAll({
                    where: {
                        shop_id: shop_id,
                        tabling_type: tabling_type,
                        created_at: {
                            [Op.gte]: shop.open_date,
                        },
                    },
                });
                return tablingList;
            } else {
                return { 'message': '오픈전입니다.' }
            }
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

            const messageService = new SolapiMessageService(process.env.MESSAGE_API_KEY || '', process.env.MESSAGE_API_SECRET || '');
            const message = await messageService.send({
                'to': (tablingList.phone_number).replace(/-/g, ''), // 수신자
                'from': process.env.MESSAGE_COLLER, // 발신자
                // TODO: 매장이름 앞에 붙이기
                'text': '고객님의 차례가 되었습니다. 지금 매장으로 와주세요!'
            });

            const returnData = {
                'id': tablingList.id,
                'shop_id': tablingList.shop_id,
                // 'message': message.groupInfo,
            };
            return returnData;
        } catch (error) {
            // TODO: error 핸들링 처리 추가
            console.log(error);
            throw error;
        }
    }
}

export default TablingModule;