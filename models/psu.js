"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class psu extends Model {
    static associate(models) {
      this.belongsTo(models.user, {});
    }
  }
  psu.init(
    {
      userId: DataTypes.INTEGER,
      nama_perusahaan: DataTypes.STRING,
      nama_direktur: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      alamat_perusahaan: DataTypes.STRING,
      lokasi_perumahan: DataTypes.STRING,
      no_shgb: DataTypes.STRING,
      an_pemilik: DataTypes.STRING,
      data_tanah: DataTypes.STRING,
      file_ktp_pemohon: DataTypes.STRING,
      file_data_perusahaan: DataTypes.STRING,
      file_sertifikat_tanah: DataTypes.STRING,
      file_data_ijin_pendukung: DataTypes.STRING,
      file_kop_surat_perusahaan: DataTypes.STRING,
      status: DataTypes.STRING,
      keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "psu",
    }
  );
  return psu;
};
