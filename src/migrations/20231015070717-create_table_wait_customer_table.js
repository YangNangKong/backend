'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('table_wait_customer', {
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
      table_management_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'table_management', // 'table_management' 테이블과 연결
          key: 'id', // 'table_management' 테이블의 'id' 열과 연결
        },
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
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
    await queryInterface.dropTable('table_wait_customer');
  }
};
