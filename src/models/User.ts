// models/user.ts
import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
    // public id!: number;
    public user_name!: string;
    public email!: string;
    public password!: string;
    public company_name!: string;
    public company_code!: string;
    public phone_number!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public deletedAt!: Date | null; // 삭제 시간

    // constructor(values?: Partial<User>, options?: BuildOptions) {
    //     super(values, options);
        
    //     this.company_name = ''; // 생성자에서 초기화
    //     this.company_code = ''; // 생성자에서 초기화
    //     this.phone_number = ''; // 생성자에서 초기화
    //     this.deletedAt = null; // 생성자에서 초기화
    // }
}

User.init(
    {
        // id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        // },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        company_code: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            defaultValue: '',
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'User',
        tableName: 'user',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
    }
);

export default User;
