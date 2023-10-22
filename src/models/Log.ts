import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Json } from 'sequelize/types/utils';

class Log extends Model {
    public id!: number;
    public action!: string; // 행위명
    public user_id!: string; // 요청아이디
    public ip_address!: string; // IP
    public log_level!: string; // progress, complete, fail, error
    public resquest_data!: Json; // 요청
    public response_data!: Json; // 응답
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        action: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        user_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        ip_address: {
            type: DataTypes.STRING, // IP 주소를 나타내는 경우
            allowNull: true,
        },
        log_level: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        resquest_data: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        response_data: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
    },
    {
        sequelize,
        modelName: 'Log',
        tableName: 'log',
        timestamps: true, // 자동 타임스탬프 활성화
    }
);

export default Log;
