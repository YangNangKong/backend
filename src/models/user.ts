// models/user.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database'; // 아래에서 정의한 데이터베이스 연결 설정

class User extends Model {
  public id!: number;
  public name!: string;
//   public email!: string;
//   public password!: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'test_table',
    timestamps: false, // 자동 타임스탬프 비활성화
  }
);

export default User;
