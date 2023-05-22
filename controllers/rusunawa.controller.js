const models = require("../models");
const { parse } = require("path");
const { cld } = require("../middlewares/uploadFile.js");
const { rusunawa, user } = models;

module.exports = {
  getAllrusunawa: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      const status = req.query.status;
      let p4;
      if (userValidasi.role === "Admin") {
        p4 = await rusunawa.findAll({
          include: user,
          where: { status },
        });
      } else {
        p4 = await rusunawa.findOne({
          include: user,
          where: { status, userId: userValidasi.id },
        });
      }

      res.status(200).send({
        status: "Success",
        message: "Get data pengaduan Penghuni Rusunawa with status " + status,
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
          message: "Could not Found data pengaduan Penghuni Rusunawa with id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get data pengaduan Penghuni Rusunawa with id",
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
    const { file_ktp, file_kk } = req.files;
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const datarusunawas = req.body;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        console.log({ ...datarusunawas });
        const add = await rusunawa.create({
          ...datarusunawas,
          userId: userValidasi.id,
          file_ktp: file_ktp[0].path,
          file_kk: file_kk[0].path,
        });

        let rusunawaId = await rusunawa.findOne({
          where: { id: add.id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "Add data pengaduan Penghuni Rusunawa, berhasil",
          data: rusunawaId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add data pengaduan Penghuni Rusunawa, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Add data pengaduan Penghuni Rusunawa, gagal",
      });
    }
  },

  deleterusunawaByID: async (req, res) => {
    const { id } = req.params;
    try {
      const {
        dataValues: { file_ktp: namaImg1, file_kk: namaImg2 },
      } = await rusunawa.findOne({ where: { id } });

      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg1).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file ktp!");
          } else {
            console.log(result, " Berhasil deleted file ktp!");
          }
        }
      );
      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(namaImg2).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file kk!");
          } else {
            console.log(result, " Berhasil deleted file kk!");
          }
        }
      );
      await rusunawa.destroy({ where: { id } });
      res.status(200).send({
        status: "Success",
        message: "Deleted data pengaduan Penghuni Rusunawa",
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
    let rusunawas = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await rusunawa.update(rusunawas, {
          where: { id },
        });
        const rusunawaId = await rusunawa.findOne({
          where: { id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "Updated data pengaduan Penghuni Rusunawa, berhasil",
          data: rusunawaId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal updated data pengaduan Penghuni Rusunawa, kamu ${userValidasi.role}`,
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

// await rusunawa
//           .findOne({ where: { id } })
//           .then((file) => {
//             if (file) {
//               const datavalues = file.dataValues;

//               let namaImg1 = path.basename(datavalues.file_ktp);
//               let namaImg2 = path.basename(datavalues.file_kk);

//               fs.unlink(`public/file_rusunawas/${namaImg1}`, (err) => {
//                 if (err) {
//                   console.error(err);
//                   return;
//                 }
//               });
//               fs.unlink(`public/file_rusunawas/${namaImg2}`, (err) => {
//                 if (err) {
//                   console.error(err);
//                   return;
//                 }
//                 console.log("delete 2 file lama sukses");
//               });
//             } else {
//               console.log(`Data not found for ID ${id}`);
//             }
//           })
//           .catch((error) => {
//             console.error(`Error: ${error}`);
//           });

//         const pathfile = process.env.PATH_FILE_PROFILE;
//         rusunawas = {
//           file_ktp: pathfile + req.files.file_ktp[0].filename,
//           file_kk: pathfile + req.files.file_kk[0].filename,
//           ...rusunawas,
//         };
//         console.log("file >>>>>>>>", { ...req.files });
