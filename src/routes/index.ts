import express from 'express';

import * as TestUserController from '../controllers/TestUserController';
import UserController from '../controllers/UserController';
import { authenticateToken } from '../modules/Token';
import ShopController from '../controllers/ShopController';
import TablingController from '../controllers/TablingController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

// TODO: Controller 에 log 로직 추가필요

// 로그인 유저
router.post('/user', UserController.createUser); // 생성
router.post('/login', UserController.login); // 로그인 및 토큰 발급

// 토큰체크 미들웨어 (이 밑으로 다 적용됨)
router.use('/', authenticateToken);
router.get('/users', UserController.getUsers); // 조회 // TODO: 전체 조회기능은 추후 필요 막는게 필요

// 매장 CRUD
router.get('/shop/:shop_id', ShopController.getShop); // 매장조회
router.post('/shop', ShopController.createShop); // 생성
// TODO: 수정, 삭제, 전체조회 구현필요

// 메인! 테이블링 로직
router.get('/tabling/waiting-list', TablingController.getWaitList); // 대기손님 리스트
router.post('/tabling/waiting-list/add', TablingController.createWaitList); // 대기손님 추가
router.put('/tabling/waiting-list/update', TablingController.updateType); // 대기손님 상태변경
router.post('/tabling/waiting-list/call', TablingController.callCustomer); // 대기손님 호출

// 테스트유저
router.post('/testUsers', TestUserController.createTestUser); // 생성
router.get('/testUsers', TestUserController.getTestUsers); // 조회

export default router;