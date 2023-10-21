import { body, ValidationChain } from 'express-validator';

export const create: ValidationChain[] = [
    body('shop_id')
        .exists().withMessage('shop_id is required')
        .isInt().withMessage('shop_id must be a int'),
    body('tabling_type')
        .exists().withMessage('tabling_type is required')
        .isString().withMessage('address must be a string')
        .isIn(['run', 'complete', 'waiting']).withMessage('tabling_type must be "run", "complete", or "waiting"'),
    body('phone_number')
        .exists().withMessage('phone_number is required')
        .isString().withMessage('phone_number must be a string'),
];

export const get: ValidationChain[] = [
    body('shop_id')
        .exists().withMessage('shop_id is required')
        .isInt().withMessage('shop_id must be a int'),
    body('tabling_type')
        .exists().withMessage('tabling_type is required')
        .isString().withMessage('address must be a string')
        .isIn(['run', 'complete', 'waiting']).withMessage('tabling_type must be "run", "complete", or "waiting"'),
];

export const update: ValidationChain[] = [
    body('id')
        .exists().withMessage('id is required')
        .isInt().withMessage('id must be a int'),
    body('tabling_type')
        .exists().withMessage('tabling_type is required')
        .isString().withMessage('address must be a string')
        .isIn(['run', 'complete', 'waiting']).withMessage('tabling_type must be "run", "complete", or "waiting"'),
];

export const callCustomer: ValidationChain[] = [
    body('id')
        .exists().withMessage('id is required')
        .isInt().withMessage('id must be a int'),
    body('tabling_type')
        .exists().withMessage('tabling_type is required')
        .isString().withMessage('address must be a string')
        .isIn(['waiting']).withMessage('tabling_type must be "run", "complete", or "waiting"'),
];