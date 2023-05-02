"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class makam_pacekeras extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  makam_pacekeras.init(
    {
      userId: DataTypes.INTEGER,
      file_rekom_rs: DataTypes.STRING,
      status: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "makam_pacekeras",
    }
  );
  return makam_pacekeras;
};
