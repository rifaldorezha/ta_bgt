"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("angkut_jenazahs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      status_jenazah: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Warga", "non-Warga"],
        defaultValue: "Warga",
      },
      permohonan_ijin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_jenazah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agama_jenazah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ttl_jenazah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tgl_wafat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tgl_pemakaman: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat_jenazah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender_jenazah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tempat_makam: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_angkut_jenazah: {
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
    await queryInterface.dropTable("angkut_jenazahs");
  },
};
