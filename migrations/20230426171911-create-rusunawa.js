"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rusunawas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      status_kawin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      domisili: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jumlah_anggota_keluarga: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_ktp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_kk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Proses", "Ditolak", "Diterima"],
        defaultValue: "Proses",
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rusunawas");
  },
};
