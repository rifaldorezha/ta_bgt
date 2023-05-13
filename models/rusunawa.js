"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rusunawa extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  rusunawa.init(
    {
      userId: DataTypes.STRING,
      status_kawin: DataTypes.STRING,
      domisili: DataTypes.STRING,
      jumlah_anggota_keluarga: DataTypes.STRING,
      file_ktp: DataTypes.STRING,
      file_kk: DataTypes.STRING,
      status: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "rusunawa",
    }
  );
  return rusunawa;
};
