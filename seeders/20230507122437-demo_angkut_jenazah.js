"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("angkat_jenazahs", [
      {
        userId: "",
        status_jenazah: "Warga",
        permohonan_ijin: "Pengangkutan ke tempat pemakaman",
        nama_jenazah: "Reza",
        agama_jenazah: "Islam",
        ttl_jenazah: "2020-12-12",
        tgl_wafat: "2021-12-12",
        tgl_pemakaman: "2022-12-12",
        alamat_jenazah: "Jkt",
        gender_jenazah: "Laki-laki",
        tempat_makam: "jl.jalan",
        file_angkut_jenazah: ".png",
        status: "Proses",
        keterangan: "Dilaksanakan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("angkat_jenazahs", null, {});
  },
};

// {
//   "userId":"",
//   "status_jenazah": "",
//   "permohonan_ijin": "",
//   "nama_jenazah": "",
//   "agama_jenazah": "",
//   "ttl_jenazah": "",
//   "tgl_wafat": "",
//   "tgl_pemakaman":"",
//   "alamat_jenazah":"",
//   "gender_jenazah": "",
//   "tempat_makam": "",
//   "file_angkut_jenazah": "",
//   "status": "",
//   "keterangan": ""
// }
