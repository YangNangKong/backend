import { Request, Response } from 'express';
import TablingModule from '../modules/TablingModule';
import * as TablingListValidation from '../validations/TablingListValidation';
import { validationResult } from 'express-validator';

class TablingController {
    static async createWaitList(req: Request, res: Response) {
        const validationChain = TablingListValidation.create;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const tabling = await TablingModule.create(req);
            res.status(201).json(tabling);
        } catch (error) {
            res.status(500).json({ error: '대기자 명단 등록에 실패했습니다.' });
        }
    }

    static async getWaitList(req: Request, res: Response) {
        const validationChain = TablingListValidation.get;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const tablingList = await TablingModule.get(req);
            res.status(201).json(tablingList);
        } catch (error) {
            res.status(500).json({ error: '대기자 명단 조회에 실패했습니다.' });
        }
    }

    static async updateType(req: Request, res: Response) {
        const validationChain = TablingListValidation.update;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const tabling = await TablingModule.update(req);
            res.status(201).json(tabling);
        } catch (error) {
            res.status(500).json({ error: '대기자 명단 수정에 실패했습니다.' });
        }
    }

    static async callCustomer(req: Request, res: Response) {
        const validationChain = TablingListValidation.callCustomer;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const tabling = await TablingModule.callCustomer(req);
            res.status(201).json(tabling);
        } catch (error) {
            res.status(500).json({ error: '대기자 명단 호출에 실패했습니다.' });
        }
    }
}

export default TablingController;