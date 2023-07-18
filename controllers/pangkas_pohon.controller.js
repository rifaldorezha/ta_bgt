const models = require("../models");
const { parse } = require("path");
const { cld } = require("../middlewares/uploadFile.js");
const { pangkas_pohon, user } = models;

module.exports = {
  getAllPangkas_pohon: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      // console.log("uservalidasi >>>", userValidasi.id);

      const status = req.query.status;
      let p1;
      if (userValidasi.role === "Admin") {
        p1 = await pangkas_pohon.findAll({
          include: user,
          where: { status },
        });
      } else {
        p1 = await pangkas_pohon.findOne({
          include: user,
          where: { status, userId: userValidasi.id },
        });
      }

      res.status(200).send({
        status: "Success",
        message:
          "resource has successfully get data pengaduan Pemangkasan Pohon with status " +
          status,
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
          message: "Could not Found data pengaduan Pemangkasan Pohon with id",
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
    console.log("Req Files: ", req.file.path);
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const pangkas_pohons = req.body;
    try {
      // console.log("req.userId >>>", req.userId);
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        console.log({ ...pangkas_pohons });
        const add = await pangkas_pohon.create({
          ...pangkas_pohons,
          userId: userValidasi.id,
          pohonImg: req.file.path,
        });

        let pangkasId = await pangkas_pohon.findOne({
          where: { id: add.id },
          include: [{ model: user }],
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
      const data = await pangkas_pohon.findOne({ where: { id } });
      const imgId = data.pohonImg;
      console.log("img id >>> ", imgId);

      cld.v2.uploader.destroy(
        "dinas_perumahan/" + parse(imgId).name,
        function (error, result) {
          if (error) {
            console.log(error, " Gagal deleted file pemangkasan pohon!");
          } else {
            console.log(result, " Berhasil deleted file pemangkasan pohon!");
          }
        }
      );

      await pangkas_pohon.destroy({
        where: { id },
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

    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await pangkas_pohon.update(req.body, {
          where: { id },
        });
        const pohonId = await pangkas_pohon.findOne({
          where: { id },
          include: [{ model: user }],
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

  updateBuktiPangkas_pohonByID: async (req, res) => {
    const { id } = req.params;

    console.log("Req Files: ", req.file.path);
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });

    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      // console.log("uservalidasi >>>", userValidasi.role);
      if (userValidasi.role === "Admin") {
        const pangkas = await pangkas_pohon.findOne({ where: { id } });
        if (pangkas.status !== "Diterima") {
          // console.log("Bukan Diterima");

          if (req.files !== null) {
            cld.v2.uploader.destroy(
              "dinas_perumahan/" + parse(req.file.path).name,
              function (error, result) {
                if (error) {
                  console.log(error, " Gagal deleted file bukti pohonImg!");
                } else {
                  console.log(result, " Berhasil deleted file bukti pohonImg!");
                }
              }
            );
          }
        } else {
          await pangkas_pohon.update(
            { bukti_pohonImg: req.file.path },
            {
              where: { id, status: "Diterima" },
            }
          );
        }

        const pohonId = await pangkas_pohon.findOne({
          where: { id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message:
            "resource has successfully Upload Bukti Pelayanan Pemangkasan Pohon",
          data: pohonId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal update bukti data pengaduan Pemangkasan Pohon, kamu ${userValidasi.role}`,
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
