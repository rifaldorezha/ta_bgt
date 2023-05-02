"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models.pangkas_pohon, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.pju, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.makam_pacekeras, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.rusunawa, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  user.init(
    {
      nama: DataTypes.STRING,
      gender: DataTypes.STRING,
      alamat: DataTypes.STRING,
      hp: DataTypes.INTEGER,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      profileImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
