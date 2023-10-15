import { Request, Response } from 'express';
import TablingModule from '../modules/TablingModule';

class TablingController {
    static async createWaitList(req: Request, res: Response) {
        // TODO: validation 추가
        try {
            const tableing = await TablingModule.create(req);
            res.status(201).json(tableing);
        } catch (error) {
            res.status(500).json({ error: '대기자 명단 등록에 실패했습니다.' });
        }
    }
}

export default TablingController;