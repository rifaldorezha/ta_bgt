"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pju extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  pju.init(
    {
      userId: DataTypes.INTEGER,
      deskripsi_pengaduan: DataTypes.STRING,
      status: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pju",
    }
  );
  return pju;
};
