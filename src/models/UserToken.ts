import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserToken extends Model {
    public user_id!: number;
    public token!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date | null; // 삭제 시간

    // 연관모델
    // public readonly User?: User;
}

// UserToken.hasOne(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// });

UserToken.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'UserToken',
        tableName: 'user_token',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
        underscored: true, // 스네이크케이스
    }
);

export default UserToken;
