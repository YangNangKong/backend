import express, { Request, Response } from 'express';
import routes from './routes'; // 라우트 파일 가져오기
const { QueryTypes } = require('sequelize');

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어 등록
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});