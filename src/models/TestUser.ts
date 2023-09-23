// models/user.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class TestUser extends Model {
  // public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TestUser.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TestUser',
    tableName: 'test_user',
    timestamps: true, // 자동 타임스탬프 활성화
  }
);

export default TestUser;
