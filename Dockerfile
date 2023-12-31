# 공식 Node.js 이미지를 기반으로 사용합니다.
FROM node:18

# 컨테이너 내에서 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json과 package-lock.json을 컨테이너로 복사합니다.
COPY package*.json ./

# 프로젝트의 의존성 패키지를 설치합니다.
RUN npm install

# 소스 코드를 컨테이너로 복사합니다.
COPY . .

# 애플리케이션이 동작하는 포트를 노출합니다.
EXPOSE 3000

# 애플리케이션을 실행합니다.
# TODO: 개발환경에서는 start script 로 간단하게 해결했지만 실서버로 올릴 때 변경이 필요함
CMD ["npm", "start"]