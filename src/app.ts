import express, { Request, Response } from 'express';
import sequelize from './config/database'; // 데이터베이스 연결 설정 가져오기
import User from './models/user'; // 모델 가져오기
const { QueryTypes } = require('sequelize');

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Sequelize와 모델 초기화
async function init() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // 모델과 데이터베이스 동기화
    console.log('데이터베이스와 연결되었습니다.');

    const results = await sequelize.query('SELECT * FROM test_table', {
      type: QueryTypes.SELECT,
    });

    User.findAll()
      .then((users) => {
        console.log('모든 사용자:', users.map((user) => user.toJSON()));
      })
      .catch((error) => {
        console.error('사용자 조회 오류:', error);
      });
  
    console.log(results);

  } catch (error) {
    console.error('데이터베이스 연결 오류:', error);
  }
}

init();