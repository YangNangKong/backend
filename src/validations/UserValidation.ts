import { body, ValidationChain } from 'express-validator';

export const create: ValidationChain[] = [
    body('user_name').exists().isString().withMessage('유저명은 필수 입니다.'),
    body('email').exists().isString().isEmail(),
    body('company_name').isString(),
    body('company_code').isString(),
    body('phone_number').isString(),
    body('password').exists().isString().isLength({ min: 5, max: 20 }),

    // TODO: 각각 withMessage 지정해줘야함
    // body('email').exists().withMessage('"{{FIELD}}" 필드는 필수 값입니다.')
    //   .isString().withMessage('이메일은 문자열이어야 합니다.')
    //   .isEmail().withMessage('유효한 이메일 주소를 입력하세요.'),
];

export const update: ValidationChain[] = [
  body('email').isEmail(),
  // 다른 유효성 검사 규칙 추가
];