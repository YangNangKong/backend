import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

class User extends Model {
    public id!: number;
    public user_name!: string;
    public user_type!: string;
    public email!: string;
    public password!: string;
    public company_name!: string;
    public company_code!: string;
    public phone_number!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date | null; // 삭제 시간

    // 연관모델
    // public UserToken?: UserToken;

    // 비밀번호 암호화 메서드
    public async hashPassword(): Promise<void> {
        const saltRounds = 10; // 암호화 강도 (조절 가능)
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    // 비밀번호 검증 메서드
    public async checkPassword(password: string) {
        return bcrypt.compare(password, this.password);
    }
}

// User.hasOne(UserToken, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// });

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        user_type: {
            type: DataTypes.STRING(20), // 데이터 타입은 사용자 유형에 따라 수정
            allowNull: false, // 필요에 따라 수정
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        company_code: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            defaultValue: null,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
        underscored: true, // 스네이크케이스
    }
);

export default User;
