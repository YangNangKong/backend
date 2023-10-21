'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'user_type', {
      type: Sequelize.STRING(20), // 데이터 타입은 사용자 유형에 따라 수정
      allowNull: false, // 필요에 따라 수정
      defaultValue: 'member', // 기본 값은 필요에 따라 수정
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'user_type');
  }
};
