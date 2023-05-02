const models = require("../models");
const { pju, user } = models;

module.exports = {
  getAllpju: async (req, res) => {
    try {
      const status = req.query.status;
      const p2 = await pju.findAll({ include: user, where: { status } });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully get",
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
          message: "Could not Found PJU by id",
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: "Get PJU with id",
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
        message: "add PJU berhasil",
        data: pjuId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "PJU add invalid",
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
          res.status(200).json({ message: "Deleted successfully" });
        } else {
          res.status(404).json({ message: "record not found" });
        }
      });
  },

  updatepjuByID: async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    try {
      let pjuData = await pju.update(data, {
        where: {
          id: id,
        },
      });
      const pjuId = await pju.findOne({
        where: {
          id,
        },
        include: [
          {
            model: user,
            required: false,
          },
        ],
      });

      // Object.assign(p2, data);
      // p2.save();
      res.status(201).send({
        message: "Pengaduan updated!",
        data: pjuId,
      });
    } catch (error) {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  },
};
