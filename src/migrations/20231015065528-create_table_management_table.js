'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('table_management', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shop_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'shop', // 'shop' 테이블과 연결
          key: 'id', // 'shop' 테이블의 'id' 열과 연결
        },
      },
      tabling_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('table_management');
  }
};
