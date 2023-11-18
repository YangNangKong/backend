import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { schema } from './graphql/schema'; // GraphQL 스키마 가져오기
import routes from './routes'; // 기존 라우트 가져오기

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

// GraphQL 스키마 설정
const graphqlServer = new ApolloServer({
  schema,
  // playground: true, // 개발 환경에서 GraphQL Playground 활성화
});

// Apollo Server 시작 및 미들웨어 설정
async function startApolloServer() {
  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: '/graphql' });
}

// startApolloServer 함수 호출
startApolloServer();

// 기존 라우트 등록
app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어 등록
app.use('/', routes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`GraphQL Playground is available at http://localhost:${PORT}/graphql`);
});
