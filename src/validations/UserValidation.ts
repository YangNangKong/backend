import { body, ValidationChain } from 'express-validator';

export const create: ValidationChain[] = [
    body('user_name')
        .exists().withMessage('user_name is required')
        .isString().withMessage('user_name must be a string'),
    body('user_type')
        .exists().withMessage('user_type is required')
        .isString().withMessage('user_type must be a string')
        .isIn(['member', 'master']).withMessage('user_type must be "member" or "master"'),
    body('email')
        .exists().withMessage('email is required')
        .isEmail().withMessage('email is not valid'),
    body('company_name')
        .optional()
        .isString().withMessage('company_name must be a string'),
    body('company_code')
        .optional()
        .isString().withMessage('company_code must be a string'),
    body('phone_number')
        .optional()
        .isString().withMessage('phone_number must be a string'),
    body('password')
        .exists().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({ min: 5, max: 20 }).withMessage('password min: 5, max: 20'),
];

export const update: ValidationChain[] = [
    body('email').isEmail(),
    // 다른 유효성 검사 규칙 추가
];

export const login: ValidationChain[] = [
    body('user_name')
        .exists().withMessage('user_name is required')
        .isString().withMessage('user_name must be a string'),
    body('password')
        .exists().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({ min: 5, max: 20 }).withMessage('password min: 5, max: 20'),
];