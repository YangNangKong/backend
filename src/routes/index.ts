import express from 'express';

import * as TestUserController from '../controllers/TestUserController';
import * as UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

// 테스트유저
router.post('/testUsers', TestUserController.createTestUser); // 생성
router.get('/testUsers', TestUserController.getTestUsers); // 조회

// 로그인 유저
router.post('/Users', UserController.createUser); // 생성
router.get('/Users', UserController.getUsers); // 조회

export default router;