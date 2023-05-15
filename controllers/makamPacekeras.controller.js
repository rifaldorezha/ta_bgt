const models = require("../models");
const path = require("path");
const fs = require("fs");
const { makam_pacekeras, user } = models;

module.exports = {
  getAllmakamPacekeras: async (req, res) => {
    try {
      const status = req.query.status;
      console.log(status);
      const p3 = await makam_pacekeras.findAll({
        include: user,
        where: { status },
      });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully get data pengaduan Makam pacekeras",
        data: p3,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  getmakamPacekerasByID: async (req, res) => {
    const { id } = req.params;
    const p3 = await makam_pacekeras.findByPk(id, {
      include: [
        {
          model: user,
          required: false,
        },
      ],
    });
    try {
      if (!p3) {
        res.status(404).json({
          message: "Could not Found data pengaduan Makam pacekeras by id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get pengaduan Makam pacekeras with id",
          data: p3,
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

  addmakamPacekeras: async (req, res) => {
    console.log({ ...req.files });
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const makams = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        // const path = process.env.PATH_FILE_MAKAM;
        console.log({ ...makams });
        const add = await makam_pacekeras.create({
          ...makams,
          userId: userValidasi.id,
          file_rekom_rs: req.files.file_rekom_rs[0].path,
        });
        console.log("pathh >>>", path);

        let makamId = await makam_pacekeras.findOne({
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
          message: "add data pengaduan Makam pacekeras berhasil",
          data: makamId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal deleted data pengaduan Makam pacekeras, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Gagal add pengaduan Makam pacekeras invalid",
      });
    }
  },

  deletemakamPacekerasByID: async (req, res) => {
    const { id } = req.params;
    try {
      const a = await makam_pacekeras
        .findOne({ where: { id } })
        .then((file) => {
          if (file) {
            const datavalues = file.dataValues;
            // console.log(datavalues);

            let namaImg = path.basename(datavalues.file_rekom_rs);
            // console.log("filename >>>>", fileName);
            fs.unlink(`public/file_makams/${namaImg}`, (err) => {
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

      await makam_pacekeras.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ msg: "Data pengaduan Makam pacekeras telah dihapus" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  },

  updatemakamPacekerasByID: async (req, res) => {
    const { id } = req.params;
    let makams = req.body;
    try {
      const userValidasi = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await makam_pacekeras.update(makams, {
          where: {
            id: id,
          },
        });
        const makamId = await makam_pacekeras.findOne({
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
            "resource has successfully updated data pengaduan Makam pacekeras",
          data: makamId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal update data pengaduan Makam pacekeras, kamu ${userValidasi.role}`,
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

// await makam_pacekeras
// .findOne({ where: { id } })
// .then((file) => {
//   if (file) {
//     const datavalues = file.dataValues;
//     // console.log(datavalues);

//     let namaImg = path.basename(datavalues.file_rekom_rs);
//     // console.log("filename >>>>", fileName);
//     fs.unlink(`public/file_makams/${namaImg}`, (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("delete file lama sukses");
//     });
//   } else {
//     console.log(`Data not found for ID ${id}`);
//   }
// })
// .catch((error) => {
//   console.error(`Error: ${error}`);
// });

// const pathfile = process.env.PATH_FILE_MAKAM;
// makams = {
// file_rekom_rs: pathfile + req.files.file_rekom_rs[0].filename,
// ...makams,
// };
// console.log("file >>>>>>>>", { ...req.files });
