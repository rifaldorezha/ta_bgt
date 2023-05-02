"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        // nik: "1234",
        nama: "admin",
        gender: "laki-laki",
        alamat: "madiun",
        hp: "0812345678",
        password: "1234",
        role: "Admin",
        profileImg: "images",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // nik: "1111",
        nama: "putra",
        gender: "perempuan",
        alamat: "bali",
        hp: "0812345678",
        password: "1111",
        role: "Guest",
        profileImg: "images",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // nik: "2222",
        nama: "putri",
        gender: "laki-laki",
        alamat: "bali",
        hp: "0812345678",
        password: "2222",
        role: "Guest",
        profileImg: "images",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
