const models = require("../models");
const { pju, user } = models;

module.exports = {
  getAllpju: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });

      const status = req.query.status;
      let p2;
      if (userValidasi.role === "Admin") {
        p2 = await pju.findAll({
          include: user,
          where: { status },
        });
      } else {
        p2 = await pju.findOne({
          include: user,
          where: { status, userId: userValidasi.id },
        });
      }

      res.status(200).send({
        status: "Success",
        message:
          "resource has successfully get data pengaduan Penerangan Jalan Umum with status " +
          status,
        data: p2,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  getpjuByID: async (req, res) => {
    const { id } = req.params;
    const p2 = await pju.findByPk(id, {
      include: [
        {
          model: user,
          required: false,
        },
      ],
    });
    try {
      if (!p2) {
        res.status(404).json({
          message: "Could not Found pengaduan Penerangan Jalan Umum with id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get pengaduan Penerangan Jalan Umum with id",
          data: p2,
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

  addpju: async (req, res) => {
    const data = req.body;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        const add = await pju.create({
          ...data,
          userId: userValidasi.id,
        });
        let pjuId = await pju.findOne({
          where: { id: add.id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "Add data pengaduan Penerangan Jalan Umum berhasil",
          data: pjuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal Add data pengaduan Penerangan Jalan Umum, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Gagal add Penerangan Jalan Umum",
      });
    }
  },

  deletepjuByID: async (req, res) => {
    await pju
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(function (deletedRecord) {
        if (deletedRecord === 1) {
          res.status(200).json({
            message:
              "Deleted data pengaduan Penerangan Jalan Umum successfully",
          });
        } else {
          res.status(404).json({
            message: "record pengaduan Penerangan Jalan Umum not found",
          });
        }
      });
  },

  updatepjuByID: async (req, res) => {
    const dataPju = req.body;
    const { id } = req.params;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await pju.update(dataPju, {
          where: { id },
        });
        const pjuId = await pju.findOne({
          where: { id },
        });
        res.status(201).send({
          message: "Data pengaduan Penerangan Jalan Umum updated!",
          status: "Success",
          data: pjuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal updated data pengaduan Penerangan Jalan Umum, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  },

  updateBuktipjuByID: async (req, res) => {
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
        const pjus = await pju.findOne({ where: { id } });
        if (pjus.status !== "Diterima") {
          // console.log("Bukan Diterima");

          if (req.files !== null) {
            cld.v2.uploader.destroy(
              "dinas_perumahan/" + parse(req.file.path).name,
              function (error, result) {
                if (error) {
                  console.log(error, " Gagal deleted file bukti pjuImg!");
                } else {
                  console.log(result, " Berhasil deleted file bukti pjuImg!");
                }
              }
            );
          }
        } else {
          await pju.update(
            { bukti_pjuImg: req.file.path },
            {
              where: { id, status: "Diterima" },
            }
          );
        }

        const pjuId = await pju.findOne({
          where: { id },
          include: [{ model: user }],
        });
        res.status(200).send({
          status: "Success",
          message: "resource has successfully Upload Bukti Pelayanan PJU",
          data: pjuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal update bukti data Pelayanan PJU, kamu ${userValidasi.role}`,
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
