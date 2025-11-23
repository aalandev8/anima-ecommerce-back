"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Actualizar los valores existentes de snake_case a camelCase
    await queryInterface.sequelize.query(`
      UPDATE stores 
      SET type = 'glutenFree' 
      WHERE type = 'gluten_free'
    `);

    // 2. Cambiar temporalmente la columna a VARCHAR para evitar problemas con ENUM
    await queryInterface.changeColumn("stores", "type", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 3. Recrear la columna como ENUM con los valores en camelCase
    await queryInterface.changeColumn("stores", "type", {
      type: Sequelize.ENUM("kosher", "diabetic", "glutenFree", "vegan", "vegetarian"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir: cambiar de camelCase a snake_case
    await queryInterface.sequelize.query(`
      UPDATE stores 
      SET type = 'gluten_free' 
      WHERE type = 'glutenFree'
    `);

    await queryInterface.changeColumn("stores", "type", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("stores", "type", {
      type: Sequelize.ENUM("kosher", "diabetic", "gluten_free", "vegan", "vegetarian"),
      allowNull: false,
    });
  },
};
