import { Request } from 'express';
import Log from '../models/Log';
import { Json } from 'sequelize/types/utils';

class LogModule {
    static async create(ip_address: string, action: string, resquest_data: any, user_id: string = 'undefined') {
        try {
            return Log.create({
                ip_address,
                action,
                resquest_data,
                user_id,
                log_level: 'progress',
            });
        } catch (error) {
            throw new Error('로그생성 실패');
        }
    }

    static async complete(log: Log, response_data: any) {
        try {
            log.update({
                response_data,
                log_level: 'complete',
            })
        } catch (error) {
            throw new Error('로그저장 실패');
        }
    }

    static async error(log: Log, response_data: any, type: string) {
        try {
            log.update({
                response_data,
                log_level: type,
            })
        } catch (error) {
            throw new Error('로그저장 실패');
        }
    }
}

export default LogModule;