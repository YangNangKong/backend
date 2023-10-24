import { body, param, ValidationChain } from 'express-validator';

export const create: ValidationChain[] = [
    body('shop_name')
        .exists().withMessage('shop_name is required')
        .isString().withMessage('shop_name must be a string'),
    body('address')
        .exists().withMessage('address is required')
        .isString().withMessage('address must be a string'),
    body('detail_address')
        .optional()
        .isString().withMessage('detail_address must be a string'),
    body('phone_number')
        .optional()
        .isString().withMessage('phone_number must be a string'),
];

export const updateStoreStatus: ValidationChain[] = [
    param('status')
        .exists().withMessage('status is required')
        .isIn(['open', 'close']).withMessage('tabling_type must be "open", "close"'),
    body('shop_id')
        .exists().withMessage('shop_id is required')
        .isInt().withMessage('shop_id must be a int'),
]