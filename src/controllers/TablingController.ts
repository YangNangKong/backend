import { Request, Response } from 'express';
import TablingModule from '../modules/TablingModule';
import * as TablingListValidation from '../validations/TablingListValidation';
import { validationResult } from 'express-validator';
import LogModule from '../modules/LogModule';
import { SolapiMessageService } from 'solapi';
import * as dotenv from 'dotenv';
dotenv.config();

class TablingController {
    static async createWaitList(req: Request, res: Response) {
        const validationChain = TablingListValidation.create;
        await Promise.all(validationChain.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }

        const log = await LogModule.create(req.ip, '대기자 명단 등록', req.body);
        try {
            const tabling = await TablingModule.create(req);
            LogModule.complete(log, tabling);
            res.status(201).json(tabling);
        } catch (error) {
            LogModule.error(log, error, 'error');
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

        const log = await LogModule.create(req.ip, '대기자 명단 상태 변경', req.body);
        try {
            const tabling = await TablingModule.update(req);
            LogModule.complete(log, tabling);
            res.status(201).json(tabling);
        } catch (error) {
            LogModule.error(log, error, 'error');
            res.status(500).json({ error: '대기자 명단 수정에 실패했습니다.' });
        }
    }

    static async callCustomer(req: Request, res: Response) {
        const messageService = new SolapiMessageService(process.env.MESSAGE_API_Key || '', process.env.MESSAGE_API_SECRET || '');
        const message = messageService.send({
            'to': '', // 수신자
            'from': '', // 발신자
            'text': '선경이는 바보다.'
        });

        res.status(200).json({ test: message });
        // const validationChain = TablingListValidation.callCustomer;
        // await Promise.all(validationChain.map(validation => validation.run(req)));
        // const errors = validationResult(req);
        // if (!(errors.isEmpty())) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        // const log = await LogModule.create(req.ip, '대기자 호출', req.body);
        // try {
        //     const tabling = await TablingModule.callCustomer(req);
        //     LogModule.complete(log, tabling);
        //     res.status(201).json(tabling);
        // } catch (error) {
        //     LogModule.error(log, error, 'error');
        //     res.status(500).json({ error: '대기자 명단 호출에 실패했습니다.' });
        // }
    }
}

export default TablingController;