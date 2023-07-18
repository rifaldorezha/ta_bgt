"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pelayanan extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  pelayanan.init(
    {
      userId: DataTypes.INTEGER,
      type_pelayanan: DataTypes.STRING,
      jumlah: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pelayanan",
    }
  );
  return pelayanan;
};
