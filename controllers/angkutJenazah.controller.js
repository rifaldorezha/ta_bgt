const models = require("../models");
const path = require("path");
const fs = require("fs");
const { angkut_jenazah, user } = models;

module.exports = {
  getAllangkutJenazah: async (req, res) => {
    try {
      const status = req.query.status;
      console.log(status);
      const p5 = await angkut_jenazah.findAll({
        include: user,
        where: { status },
      });
      res.status(200).send({
        status: "Success",
        message:
          "resource has successfully get data pengangkutan jenazah warga",
        data: p5,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  getangkutJenazahByID: async (req, res) => {
    const { id } = req.params;
    const p5 = await angkut_jenazah.findByPk(id, {
      include: [
        {
          model: user,
          required: false,
        },
      ],
    });
    try {
      if (!p5) {
        res.status(404).json({
          message: "Could not Found data pengangkutan jenazah warga by id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get data pengangkutan jenazah warga with id",
          data: p5,
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

  addangkutJenazah: async (req, res) => {
    console.log({ ...req.files });
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const angkuts = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        const path = process.env.PATH_FILE_ANGKUT;
        console.log({ ...angkuts });
        const add = await angkut_jenazah.create({
          ...angkuts,
          file_angkut_jenazah: path + req.files.file_angkut_jenazah[0].filename,
        });
        console.log("pathh >>>", path);

        let angkutId = await angkut_jenazah.findOne({
          where: {
            id: add.id,
          },
          include: [
            {
              model: user,
            },
          ],
        });
        res.status(200).send({
          status: "Success",
          message: "Add data data pengangkutan jenazah warga, berhasil",
          data: angkutId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add data pengangkutan jenazah warga , kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Add data pengangkutan jenazah warga, gagal",
      });
    }
  },

  deleteangkutJenazahByID: async (req, res) => {
    const { id } = req.params;
    try {
      const a = await angkut_jenazah
        .findOne({ where: { id } })
        .then((file) => {
          if (file) {
            const datavalues = file.dataValues;
            // console.log(datavalues);

            let namafile = path.basename(datavalues.file_angkut_jenazah);
            // console.log("filename >>>>", fileName);
            fs.unlink(`public/file_angkut_jenazahs/${namafile}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("Delete file data pengangkutan jenazah warga sukses");
            });
          } else {
            console.log(`Data not found for ID ${id}`);
          }
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });

      await angkut_jenazah.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ msg: "Data pengangkutan jenazah warga telah dihapus" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  },

  updateangkutJenazahByID: async (req, res) => {
    const { id } = req.params;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await angkut_jenazah
          .findOne({ where: { id } })
          .then((file) => {
            if (file) {
              const datavalues = file.dataValues;
              // console.log(datavalues);

              let namafile = path.basename(datavalues.file_angkut_jenazah);
              // console.log("filename >>>>", fileName);
              fs.unlink(`public/file_angkut_jenazahs/${namafile}`, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log("delete file lama sukses");
              });
            } else {
              console.log(`Data not found for ID ${id}`);
            }
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });

        const pathfile = process.env.PATH_FILE_ANGKUT;
        let angkuts = req.body;
        angkuts = {
          file_angkut_jenazah:
            pathfile + req.files.file_angkut_jenazah[0].filename,
          ...angkuts,
        };
        console.log("file >>>>>>>>", { ...req.files });

        let angkutData = await angkut_jenazah.update(angkuts, {
          where: {
            id: id,
          },
        });
        const angkutId = await angkut_jenazah.findOne({
          where: {
            id,
          },
          include: [
            {
              model: user,
            },
          ],
        });
        res.status(200).send({
          status: "Success",
          message:
            "resource has successfully data pengangkutan jenazah warga data",
          data: {
            angkutId,
          },
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal update data pengangkutan jenazah warga, kamu ${userValidasi.role}`,
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
