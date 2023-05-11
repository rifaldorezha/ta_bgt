"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pjus", [
      {
        userId: "",
        deskripsi_pengaduan: "pengaduan pju 1",
        status: "Proses",
        keterangan: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pjus", null, {});
  },
};
