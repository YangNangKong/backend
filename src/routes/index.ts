import express from 'express';

import * as TestUserController from '../controllers/TestUserController';
import UserController from '../controllers/UserController';
import { authenticateToken } from '../modules/Token';
import ShopController from '../controllers/ShopController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

// 로그인 유저
router.post('/user', UserController.createUser); // 생성
router.post('/login', UserController.login); // 로그인 및 토큰 발급

// 토큰체크 미들웨어 (이 밑으로 다 적용됨)
router.use('/', authenticateToken);
router.get('/users', UserController.getUsers); // 조회 // TODO: 전체 조회기능은 추후 필요 막는게 필요

// 매장 CRUD
router.post('/shop', ShopController.createShop); // 생성

// 테스트유저
router.post('/testUsers', TestUserController.createTestUser); // 생성
router.get('/testUsers', TestUserController.getTestUsers); // 조회

export default router;