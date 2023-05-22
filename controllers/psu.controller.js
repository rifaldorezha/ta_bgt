const models = require("../models");
const { parse } = require("path");
const { cld } = require("../middlewares/uploadFile.js");
const { psu, user } = models;

module.exports = {
  getAllpsu: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });

      const status = req.query.status;
      let psus;
      if (userValidasi.role === "Admin") {
        psus = await psu.findAll({
          include: user,
          where: { status },
        });
      } else {
        psus = await psu.findOne({
          include: user,
          where: { status, userId: userValidasi.id },
        });
      }

      res.status(200).send({
        status: "Success",
        message: "resource has successfully get PSU with status " + status,
        data: psus,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  getpsuByID: async (req, res) => {
    const { id } = req.params;
    const psus = await psu.findByPk(id, {
      include: [
        {
          model: user,
          required: false,
        },
      ],
    });
    try {
      if (!psus) {
        res.status(404).json({
          message: "Could not Found pengaduan PSU with id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get pengaduan PSU with id",
          data: psus,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  addpsu: async (req, res) => {
    const {
      file_ktp_pemohon,
      file_sertifikat_tanah,
      file_data_perusahaan,
      file_data_ijin_pendukung,
      file_kop_surat_perusahaan,
    } = req.files;
    console.log({ ...req.files });
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const dataPsu = req.body;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        console.log({ ...dataPsu });
        const addPsu = await psu.create({
          ...dataPsu,
          userId: userValidasi.id,
          file_ktp_pemohon: file_ktp_pemohon[0].path,
          file_data_perusahaan: file_data_perusahaan[0].path,
          file_sertifikat_tanah: file_sertifikat_tanah[0].path,
          file_data_ijin_pendukung: file_data_ijin_pendukung[0].path,
          file_kop_surat_perusahaan: file_kop_surat_perusahaan[0].path,
        });

        let psuId = await psu.findOne({
          where: { id: addPsu.id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "Add data pengaduan PSU, berhasil",
          data: psuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add data pengaduan PSU, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Gagal Add data pengaduan PSU",
      });
    }
  },

  deletepsuByID: async (req, res) => {
    const { id } = req.params;

    try {
      const {
        dataValues: {
          file_ktp_pemohon: namaImg1,
          file_sertifikat_tanah: namaImg2,
          file_data_perusahaan: namaImg3,
          file_data_ijin_pendukung: namaImg4,
          file_kop_surat_perusahaan: namaImg5,
        },
      } = await psu.findOne({ where: { id } });

      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg1).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file ktp pemohon!");
          } else {
            console.log(result, " Berhasil deleted file ktp pemohon!");
          }
        }
      );
      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg2).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file sertifikat tanah!");
          } else {
            console.log(result, " Berhasil deleted file sertifikat tanah!");
          }
        }
      );
      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg3).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file data perusahaan!");
          } else {
            console.log(result, " Berhasil deleted file data perusahaan!");
          }
        }
      );
      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg4).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file data ijin pendukung!");
          } else {
            console.log(result, " Berhasil deleted file data ijin pendukun!");
          }
        }
      );
      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg5).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file kop surat perusahaan!");
          } else {
            console.log(result, " Berhasil deleted file kop surat perusahaan!");
          }
        }
      );

      await psu.destroy({
        where: { id },
      });
      res.status(200).send({
        status: "Success",
        message: "Deleted data pengaduan PSU",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Deleted not found",
      });
    }
  },

  updatepsuByID: async (req, res) => {
    const { id } = req.params;
    let psus = req.body;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await psu.update(psus, {
          where: { id },
        });
        const psuId = await psu.findOne({
          where: { id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "Updated data pengaduan PSU, berhasil",
          data: psuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal updated data pengaduan PSU, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Update not found",
      });
    }
  },
};
