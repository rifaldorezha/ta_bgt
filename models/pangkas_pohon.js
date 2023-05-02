"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pangkas_pohon extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  pangkas_pohon.init(
    {
      userId: DataTypes.INTEGER,
      deskripsi_pengaduan: DataTypes.STRING,
      pohonImg: DataTypes.STRING,
      status: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pangkas_pohon",
    }
  );
  return pangkas_pohon;
};
