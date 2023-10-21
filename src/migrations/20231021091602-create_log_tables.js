'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('log', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      action: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      ip_address: {
        type: Sequelize.STRING, // IP 주소를 나타내는 경우
        allowNull: true,
      },
      log_level: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      resquest_data: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      response_data: {
        type: Sequelize.JSON,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('log');
  }
};
