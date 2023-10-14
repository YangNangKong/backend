import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class UserToken extends Model {
    public user_id!: number;
    public token!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public deletedAt!: Date | null; // 삭제 시간

    // 연관모델
    // public readonly User?: User;

    // User
    public readonly User?: User;
    static associate(models: { User: typeof User }) {
        UserToken.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    }
}

// UserToken.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// });

UserToken.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'UserToken',
        tableName: 'user_token',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
    }
);

export default UserToken;
