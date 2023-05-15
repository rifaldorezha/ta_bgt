const models = require("../models");
const path = require("path");
const fs = require("fs");
const { psu, user } = models;

module.exports = {
  getAllpsu: async (req, res) => {
    try {
      const status = req.query.status;
      const psus = await psu.findAll({
        include: user,
        where: { status },
      });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully get PSU",
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
          message: "Could not Found pengaduan PSU by id",
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
    console.log({ ...req.files });
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const dataPsu = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        // const path = process.env.PATH_FILE_PSU;
        console.log({ ...dataPsu });
        const addPsu = await psu.create({
          ...dataPsu,
          userId: userValidasi.id,
          file_ktp_pemohon: req.files.file_ktp_pemohon[0].path,
          file_sertifikat_tanah: req.files.file_sertifikat_tanah[0].path,
          file_data_perusahaan: req.files.file_data_perusahaan[0].path,
          file_sertifikat_tanah: req.files.file_sertifikat_tanah[0].path,
          file_data_ijin_pendukung: req.files.file_data_ijin_pendukung[0].path,
          file_kop_surat_perusahaan:
            req.files.file_kop_surat_perusahaan[0].path,
        });

        let psuId = await psu.findOne({
          where: {
            id: addPsu.id,
          },
          include: [
            {
              model: user,
            },
          ],
        });
        res.status(200).send({
          status: "Success",
          message: "Add data pengaduan PSU, berhasil",
          data: psuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add pengaduan PSU, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Add data pengaduan PSU, gagal",
      });
    }
  },

  deletepsuByID: async (req, res) => {
    const { id } = req.params;

    try {
      await psu
        .findOne({ where: { id } })
        .then((file) => {
          if (file) {
            const datavalues = file.dataValues;

            let namaImg1 = path.basename(datavalues.file_ktp_pemohon);
            let namaImg2 = path.basename(datavalues.file_data_perusahaan);
            let namaImg3 = path.basename(datavalues.file_sertifikat_tanah);
            let namaImg4 = path.basename(datavalues.file_data_ijin_pendukung);
            let namaImg5 = path.basename(datavalues.file_kop_surat_perusahaan);

            fs.unlink(`public/file_psus/${namaImg1}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
            fs.unlink(`public/file_psus/${namaImg2}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
            fs.unlink(`public/file_psus/${namaImg3}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
            fs.unlink(`public/file_psus/${namaImg4}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
            fs.unlink(`public/file_psus/${namaImg5}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("delete 5 file pengaduan PSU lama sukses");
            });
          } else {
            console.log(`Data not found for ID ${id}`);
          }
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
      await psu.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        status: "Success",
        message: "Deleted data pengaduan PSU",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Delete not found",
      });
    }
  },

  updatepsuByID: async (req, res) => {
    const { id } = req.params;
    let psus = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await psu.update(psus, {
          where: {
            id: id,
          },
        });
        const psuId = await psu.findOne({
          where: {
            id,
          },
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
