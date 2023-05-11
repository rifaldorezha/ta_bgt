const models = require("../models");
const path = require("path");
const fs = require("fs");
const { pangkas_pohon, user } = models;

module.exports = {
  getAllPangkas_pohon: async (req, res) => {
    try {
      const status = req.query.status;
      const p1 = await pangkas_pohon.findAll({
        include: user,
        where: { status },
      });
      res.status(200).send({
        status: "Success",
        message:
          "resource has successfully get data pengaduan Pemangkasan Pohon",
        data: p1,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  getPangkas_pohonByID: async (req, res) => {
    const { id } = req.params;
    const p1 = await pangkas_pohon.findByPk(id, {
      include: [
        {
          model: user,
          required: false,
        },
      ],
    });
    try {
      if (!p1) {
        res.status(404).json({
          message: "Could not Found data pengaduan Pemangkasan Pohon by id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get pengaduan Pemangkasan Pohon with id",
          data: p1,
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

  addPangkas_pohon: async (req, res) => {
    console.log({ ...req.files });
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const pangkas_pohons = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        const path = process.env.PATH_FILE_PANGKAS;
        console.log({ ...pangkas_pohons });
        const add = await pangkas_pohon.create({
          ...pangkas_pohons,
          pohonImg: path + req.files.pohonImg[0].filename,
        });

        let pangkasId = await pangkas_pohon.findOne({
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
          message: "Add data pengaduan Pemangkasan Pohon berhasil",
          data: pangkasId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add data pengaduan Pemangkasan Pohon, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Gagal add pengaduan Pemangkasan Pohon invalid",
      });
    }
  },

  deletePangkas_pohonByID: async (req, res) => {
    const { id } = req.params;

    try {
      const a = await pangkas_pohon
        .findOne({ where: { id } })
        .then((file) => {
          if (file) {
            const datavalues = file.dataValues;
            // console.log(datavalues);

            let namaImg = path.basename(datavalues.pohonImg);
            // console.log("filename >>>>", fileName);
            fs.unlink(`public/pangkas_pohons/${namaImg}`, (err) => {
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

      await pangkas_pohon.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ msg: "Data pengaduan Pemangkasan pohon telah dihapus" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  },

  updatePangkas_pohonByID: async (req, res) => {
    const { id } = req.params;
    let pangkas_pohons = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await pangkas_pohon
          .findOne({ where: { id } })
          .then((file) => {
            if (file) {
              const datavalues = file.dataValues;
              // console.log(datavalues);

              let namaImg = path.basename(datavalues.pohonImg);
              // console.log("filename >>>>", fileName);
              fs.unlink(`public/pangkas_pohons/${namaImg}`, (err) => {
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

        const pathfile = process.env.PATH_FILE_PANGKAS;
        pangkas_pohons = {
          pohonImg: pathfile + req.files.pohonImg[0].filename,
          ...pangkas_pohons,
        };

        let pohonData = await pangkas_pohon.update(pangkas_pohons, {
          where: {
            id: id,
          },
        });
        const pohonId = await pangkas_pohon.findOne({
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
            "resource has successfully updated data pengaduan Pemangkasan Pohon",
          data: pohonId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal update data pengaduan Pemangkasan Pohon, kamu ${userValidasi.role}`,
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
