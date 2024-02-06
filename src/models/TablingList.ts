import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class TablingList extends Model {
    public id!: number;
    public shop_id!: number;
    public tabling_type!: string;
    public phone_number!: string;
    public personnel!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at!: Date | null; // 삭제 시간
}

TablingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        shop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tabling_type: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        personnel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'TablingList',
        tableName: 'tabling_list',
        paranoid: true, // 소프트 삭제 활성화
        timestamps: true, // 자동 타임스탬프 활성화
        underscored: true, // 스네이크케이스
    }
);

export default TablingList;
