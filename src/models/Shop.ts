import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Shop extends Model {
    public id!: number;
    public shop_name!: string;
    public phone_number!: string;
    public address!: string;
    public detail_address!: string;
    public open_date!: Date; // 오픈시간
    public closed_date!: Date; // 마감시간
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public deletedAt!: Date | null; // 삭제 시간
}

Shop.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        shop_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        detail_address: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        open_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        closed_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
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
        modelName: 'Shop',
        tableName: 'shop',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
    }
);

export default Shop;
