"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("makam_pacekeras", []);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("makam_pacekeras", null, {});
  },
};
