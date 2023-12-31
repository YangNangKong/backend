import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config(); // .env 파일에서 환경 변수 로드

const dbHost = process.env.MYSQL_NAME;
const dbPort = process.env.MYSQL_PORT;
const dbUser = process.env.MYSQL_USER;
const dbPassword = process.env.MYSQL_PASSWORD;
const dbName = process.env.MYSQL_DATABASE;
const migrationsPath = './src/migrations';

// 커맨드 라인 옵션 확인
const args = process.argv.slice(2);
const isRollback = args.includes('--rollback'); // 롤백옵션

let command = '';
if (isRollback) {
    command = `npx sequelize-cli db:migrate:undo --migrations-path=${migrationsPath} --url mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
} else {
    command = `npx sequelize-cli db:migrate --migrations-path=${migrationsPath} --url mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
}

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error);
        console.error('stderr:', stderr);
        return;
    }

    console.log('stdout:', stdout);
    isRollback ? console.log('롤백 성공!') : console.log('마이그레이션 성공!');
});
