import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Shop extends Model {
    public id!: number;
    public shop_name!: string;
    public phone_number!: string;
    public address!: string;
    public detail_address!: string;
    public open_date!: Date | null; // 오픈시간
    public closed_date!: Date | null; // 마감시간
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date | null; // 삭제 시간
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
        modelName: 'Shop',
        tableName: 'shop',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
        underscored: true, // 스네이크케이스
    }
);

export default Shop;
