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
        message: "resource has successfully get",
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
          message: "Could not Found Rusunawa by id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get Rusunawa with id",
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
    try {
      const datarusunawas = req.body;
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
        message: "add Rusunawa berhasil",
        data: { rusunawaId },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Rusunawa add invalid",
      });
    }
  },

  deleterusunawaByID: async (req, res) => {},

  updaterusunawaByID: async (req, res) => {
    const { id } = req.params;

    const a = await rusunawa
      .findOne({ where: { id } })
      .then((file) => {
        if (file) {
          const datavalues = file.dataValues;

          let namaImg1 = path.basename(datavalues.file_ktp);
          let namaImg2 = path.basename(datavalues.file_kk);

          fs.unlink(
            `public/file_rusunawas/${namaImg1}` &&
              `public/file_rusunawas/${namaImg2}`,
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("delete file lama sukses");
            }
          );
        } else {
          console.log(`Data not found for ID ${id}`);
        }
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

    try {
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
        message: "resource has successfully updated Rusunawa",
        data: {
          rusunawaId,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Update not found",
      });
    }
  },
};
