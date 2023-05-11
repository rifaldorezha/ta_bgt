const models = require("../models");
const { pju, user } = models;

module.exports = {
  getAllpju: async (req, res) => {
    try {
      const status = req.query.status;
      const p2 = await pju.findAll({
        include: user,
        where: { status },
      });
      res.status(200).send({
        status: "Success",
        message:
          "resource has successfully get pengaduan Penerangan Jalan Umum",
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
          message: "Could not Found pengaduan Penerangan Jalan Umum by id",
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
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Guest") {
        const add = await pju.create(data);
        let pjuId = await pju.findOne({
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
          message: "Add pengaduan Penerangan Jalan Umum berhasil",
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
            message: "Deleted pengaduan Penerangan Jalan Umum successfully",
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
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await pju.update(dataPju, {
          where: {
            id: id,
          },
        });
        const pjuId = await pju.findOne({
          where: {
            id,
          },
        });
        res.status(201).send({
          message: "Pengaduan Penerangan Jalan Umum updated!",
          data: pjuId,
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal update data pengaduan Penerangan Jalan Umum, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  },
};
