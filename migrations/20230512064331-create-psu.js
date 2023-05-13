"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("psus", {
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
      nama_perusahaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_direktur: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jabatan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat_perusahaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lokasi_perumahan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_shgb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      an_pemilik: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_tanah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_ktp_pemohon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_data_perusahaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_sertifikat_tanah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_data_ijin_pendukung: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_kop_surat_perusahaan: {
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
    await queryInterface.dropTable("psus");
  },
};
