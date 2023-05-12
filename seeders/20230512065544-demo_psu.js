"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("psus", [
      {
        userId: "",
        nama_perusahaan: "Warga",
        nama_direktur: "Pengangkutan ke tempat pemakaman",
        jabatan: "Reza",
        alamat_perusahaan: "Islam",
        lokasi_perumahan: "2020-12-12",
        no_shgb: "2021-12-12",
        an_pemilik: "2022-12-12",
        data_tanah: "Jkt",
        file_ktp_pemohon: "Laki-laki",
        file_data_perusahaan: "jl.jalan",
        file_sertifikat_tanah: ".png",
        file_data_ijin_pendukung: ".png",
        file_kop_surat_perusahaan: ".png",
        status: "Proses",
        keterangan: "Dilaksanakan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("psus", null, {});
  },
};
