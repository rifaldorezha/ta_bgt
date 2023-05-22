const models = require("../models");
const { parse } = require("path");
const { cld } = require("../middlewares/uploadFile.js");
const { angkut_jenazah, user } = models;

module.exports = {
  getAllangkutJenazah: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      const status = req.query.status;

      let p5;
      if (userValidasi.role === "Admin") {
        p5 = await angkut_jenazah.findAll({
          include: user,
          where: { status },
        });
      } else {
        p5 = await angkut_jenazah.findOne({
          include: user,
          where: { status, userId: userValidasi.id },
        });
      }
      res.status(200).send({
        status: "Success",
        message:
          "resource has successfully get data pengangkutan jenazah warga with status " +
          status,
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
          message: "Could not Found data pengangkutan jenazah warga with id",
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
    console.log("Req Files: ", req.file.path);
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const angkuts = req.body;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        console.log({ ...angkuts });
        const add = await angkut_jenazah.create({
          ...angkuts,
          userId: userValidasi.id,
          file_angkut_jenazah: req.file.path,
        });

        let angkutId = await angkut_jenazah.findOne({
          where: {
            id: add.id,
          },
          include: [{ model: user }],
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
      const data = await angkut_jenazah.findOne({ where: { id } });
      const imgId = data.file_angkut_jenazah;
      console.log("img id >>> ", imgId);

      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(imgId).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file angkut jenazah!");
          } else {
            console.log(result, "Berhasil deleted file angkut jenazah!");
          }
        }
      );

      await angkut_jenazah.destroy({
        where: { id },
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
    let angkuts = req.body;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await angkut_jenazah.update(angkuts, {
          where: { id },
        });
        const angkutId = await angkut_jenazah.findOne({
          where: { id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message:
            "resource has successfully updated data pengangkutan jenazah warga",
          data: angkutId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal updated data pengangkutan jenazah warga, kamu ${userValidasi.role}`,
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

// await angkut_jenazah
//           .findOne({ where: { id } })
//           .then((file) => {
//             if (file) {
//               const datavalues = file.dataValues;
//               // console.log(datavalues);

//               let namafile = path.basename(datavalues.file_angkut_jenazah);
//               // console.log("filename >>>>", fileName);
//               fs.unlink(`public/file_angkut_jenazahs/${namafile}`, (err) => {
//                 if (err) {
//                   console.error(err);
//                   return;
//                 }
//                 console.log("delete file lama sukses");
//               });
//             } else {
//               console.log(`Data not found for ID ${id}`);
//             }
//           })
//           .catch((error) => {
//             console.error(`Error: ${error}`);
//           });

//         const pathfile = process.env.PATH_FILE_ANGKUT;

//         angkuts = {
//           file_angkut_jenazah:
//             pathfile + req.files.file_angkut_jenazah[0].filename,
//           ...angkuts,
//         };
//         console.log("file >>>>>>>>", { ...req.files });
