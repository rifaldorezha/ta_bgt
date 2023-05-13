"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class angkut_jenazah extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  angkut_jenazah.init(
    {
      userId: DataTypes.STRING,
      status_jenazah: DataTypes.STRING,
      permohonan_ijin: DataTypes.STRING,
      nama_jenazah: DataTypes.STRING,
      agama_jenazah: DataTypes.STRING,
      ttl_jenazah: DataTypes.STRING,
      tgl_wafat: DataTypes.STRING,
      tgl_pemakaman: DataTypes.STRING,
      alamat_jenazah: DataTypes.STRING,
      gender_jenazah: DataTypes.STRING,
      tempat_makam: DataTypes.STRING,
      file_angkut_jenazah: DataTypes.STRING,
      status: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "angkut_jenazah",
    }
  );
  return angkut_jenazah;
};
