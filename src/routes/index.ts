import express from 'express';

import UserController from '../controllers/UserController';
import { authenticateToken } from '../modules/Token';
import ShopController from '../controllers/ShopController';
import TablingController from '../controllers/TablingController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

// 로그인 유저
router.post('/user', UserController.createUser); // 생성
router.post('/login', UserController.login); // 로그인 및 토큰 발급
router.get('/user', UserController.getUser); // 단일조회

// 토큰체크 미들웨어 (이 밑으로 다 적용됨)
router.use('/', authenticateToken);
router.get('/users', UserController.getUsers); // 조회 // TODO: 전체 조회기능은 추후 필요 막는게 필요

// 매장 CRUD
router.get('/shop/:shop_id', ShopController.getShop); // 매장조회
router.post('/shop', ShopController.createShop); // 생성
router.put('/shop/:status', ShopController.updateStoreStatus); // 오픈, 마감

// 메인! 테이블링 로직
router.get('/tabling/waiting-list', TablingController.getWaitList); // 대기손님 리스트
router.post('/tabling/waiting-list/add', TablingController.createWaitList); // 대기손님 추가
router.put('/tabling/waiting-list/update', TablingController.updateType); // 대기손님 상태변경
router.post('/tabling/waiting-list/call', TablingController.callCustomer); // 대기손님 호출

export default router;