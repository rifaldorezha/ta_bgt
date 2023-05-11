const models = require("../models");
const path = require("path");
const fs = require("fs");
const { rusunawa, user } = models;

module.exports = {
  getAllrusunawa: async (req, res) => {
    try {
      const status = req.query.status;
      const p4 = await rusunawa.findAll({ include: user, where: { status } });
      res.status(200).send({
        status: "Success",
        message: "Get data pengaduan penghuni Rusunawa",
        data: p4,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  getrusunawaByID: async (req, res) => {
    const { id } = req.params;
    const p4 = await rusunawa.findByPk(id, {
      include: [
        {
          model: user,
          required: false,
        },
      ],
    });
    try {
      if (!p4) {
        res.status(404).json({
          message: "Could not Found data pengaduan penghuni Rusunawa by id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get data pengaduan penghuni Rusunawa with id",
          data: p4,
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

  addrusunawa: async (req, res) => {
    console.log({ ...req.files });
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const datarusunawas = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        const path = process.env.PATH_FILE_RUSUNAWA;
        console.log({ ...datarusunawas });
        const add = await rusunawa.create({
          ...datarusunawas,
          file_ktp: path + req.files.file_ktp[0].filename,
          file_kk: path + req.files.file_kk[0].filename,
        });

        let rusunawaId = await rusunawa.findOne({
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
          message: "Add data pengaduan penghuni Rusunawa, berhasil",
          data: rusunawaId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add data pengaduan penghuni Rusunawa, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Add data pengaduan penghuni Rusunawa, gagal",
      });
    }
  },

  deleterusunawaByID: async (req, res) => {
    const { id } = req.params;

    try {
      const a = await rusunawa
        .findOne({ where: { id } })
        .then((file) => {
          if (file) {
            const datavalues = file.dataValues;

            let namaImg1 = path.basename(datavalues.file_ktp);
            let namaImg2 = path.basename(datavalues.file_kk);

            fs.unlink(`public/file_rusunawas/${namaImg1}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
            fs.unlink(`public/file_rusunawas/${namaImg2}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("delete 2 file lama sukses");
            });
          } else {
            console.log(`Data not found for ID ${id}`);
          }
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
      let rusunawaData = await rusunawa.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        status: "Success",
        message: "Deleted data pengaduan penghuni Rusunawa",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Delete not found",
      });
    }
  },

  updaterusunawaByID: async (req, res) => {
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
        await rusunawa
          .findOne({ where: { id } })
          .then((file) => {
            if (file) {
              const datavalues = file.dataValues;

              let namaImg1 = path.basename(datavalues.file_ktp);
              let namaImg2 = path.basename(datavalues.file_kk);

              fs.unlink(`public/file_rusunawas/${namaImg1}`, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
              fs.unlink(`public/file_rusunawas/${namaImg2}`, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log("delete 2 file lama sukses");
              });
            } else {
              console.log(`Data not found for ID ${id}`);
            }
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });

        const pathfile = process.env.PATH_FILE_PROFILE;
        let rusunawas = req.body;
        rusunawas = {
          file_ktp: pathfile + req.files.file_ktp[0].filename,
          file_kk: pathfile + req.files.file_kk[0].filename,
          ...rusunawas,
        };
        console.log("file >>>>>>>>", { ...req.files });

        let rusunawaData = await rusunawa.update(rusunawas, {
          where: {
            id: id,
          },
        });
        const rusunawaId = await rusunawa.findOne({
          where: {
            id,
          },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "Updated pengaduan penghuni Rusunawa, berhasil",
          data: {
            rusunawaId,
          },
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal updated data pengaduan penghuni Rusunawa, kamu ${userValidasi.role}`,
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
