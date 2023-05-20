const models = require("../models");
const { user, pangkas_pohon, pju, makam_pacekeras, rusunawa, angkut_jenazah, psu } =
  models;
const { parse } = require("path");
const { cld } = require("../middlewares/uploadFile.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const users = req.body;

      // Check username
      const checkId = await user.findOne({
        where: { id: users.id },
      });
      if (!checkId) {
        return res.status(500).send({
          status: "failed",
          message: "Username Or Password don't match",
        });
      }

      const isValidPassword = await bcrypt.compare(users.password, checkId.password);
      if (!isValidPassword) {
        return res.status(500).send({
          status: "failed",
          message: "Username Or Password don't match",
        });
      }

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(
        {
          id: checkId.id,
          role: checkId.role,
        },
        secretKey
      );

      res.status(200).send({
        status: "Success",
        message: "resource succesfully sign In",
        data: {
          id: checkId.id,
          nama: checkId.nama,
          role: checkId.role,
          gender: checkId.gender,
          alamat: checkId.alamat,
          profileImg: checkId.profileImg,
          hp: checkId.hp,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Sign In Invalid",
      });
    }
  },

  checkAuth: async (req, res) => {
    try {
      const id = req.userId;
      const dataUser = await user.findOne({
        where: { id },
      });
      if (!dataUser) {
        return res.status(500).send({
          status: "Data User tidak ada",
        });
      }

      res.status(200).send({
        status: "success",
        message: "resource successfully check auth",
        data: {
          id: dataUser.id,
          nama: dataUser.nama,
          role: dataUser.role,
          gender: dataUser.gender,
          alamat: dataUser.alamat,
          profileImg: dataUser.profileImg,
          hp: dataUser.hp,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Auth Gagal",
      });
    }
  },

  // Sign Up
  addUser: async (req, res) => {
    try {
      const users = req.body;

      const checkId = await user.findOne({
        where: { id: users.id },
      });
      if (checkId) {
        return res.status(500).send({
          status: "failed",
          message: "Nik Already Registered",
        });
      }

      if (users.id.length < 16) {
        return res.status(500).send({
          status: "failed",
          message: "Pastikan id/NIK yang dimasukkan benar!",
        });
      }

      if (users.password.length < 4)
        return res.status(400).send({
          message: "Password gunakan tanggal lahir anda YYYYMMDD",
        });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(users.password, salt);

      const add = await user.create({
        ...users,
        password: hashPassword,
      });

      res.status(200).send({
        status: "Success",
        message: "add User berhasil",
        data: add,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "User add invalid",
      });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        const role = req.query.role;
        const users = await user.findAll({
          include: [
            { model: pangkas_pohon },
            { model: pju },
            { model: makam_pacekeras },
            { model: rusunawa },
            { model: angkut_jenazah },
            { model: psu },
          ],
          where: { role },
        });
        res.status(200).send({
          status: "Success",
          message: "Get data user role",
          data: { users },
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal get data user, kamu ${userValidasi.role}`,
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

  getAllpengaduanbyAuth: async (req, res) => {
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.id);

      const id = userValidasi.id;

      if (!id) {
        res.status(500).send({
          status: "failed",
          message: `Gagal get data pengaduan berdasarkan current userId`,
        });
      } else {
        const users = await user.findAll({
          include: [
            { model: pangkas_pohon },
            { model: pju },
            { model: makam_pacekeras },
            { model: rusunawa },
            { model: angkut_jenazah },
            { model: psu },
          ],
          where: { id },
        });
        res.status(200).send({
          status: "Success",
          message: "Get data pengaduan user auth",
          data: { users },
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

  getUserByid: async (req, res) => {
    const { id } = req.params;
    try {
      const userPk = await user.findByPk(id, {
        include: [
          { model: pangkas_pohon },
          { model: pju },
          { model: makam_pacekeras },
          { model: rusunawa },
          { model: angkut_jenazah },
          { model: psu },
        ],
      });
      res.status(200).send({
        status: "Success",
        message: "Get User with id",
        data: userPk,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "User id not found",
      });
    }
  },

  deleteUserByid: async (req, res) => {
    const { id } = req.params;
    try {
      const userValidasi = await user.findOne({
        where: { id: req.userId },
      });
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        const {
          dataValues: { profileImg },
        } = await user.findOne({ where: { id } });
        console.log("data values >>>", profileImg);

        cld.v2.uploader.destroy(
          "dinas_perumahan/" + parse(profileImg).name,
          function (error, result) {
            if (error) {
              console.log(error, " Gagal deleted file profile image!");
            } else {
              console.log(result, " Berhasil deleted file profile image!");
            }
          }
        );

        await user.destroy({
          where: { id },
        });
        res.status(200).send({
          status: "Success",
          message: "resource has successfully deleted user",
        });
      } else {
        res.status(500).send({
          status: "failed",
          message: `Gagal delete data user, kamu ${userValidasi.role}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Delete not found",
      });
    }
  },

  updateUserByid: async (req, res) => {
    const { id } = req.params;
    let users = req.body;
    console.log("Req Files: ", req.file.path);
    try {
      const data = await user.findOne({ where: { id } });

      console.log("data values >>>", data.dataValues.profileImg);
      if (data.dataValues.profileImg !== null) {
        cld.v2.uploader.destroy(
          "dinas_perumahan/" + parse(data.dataValues.profileImg).name,
          function (error, result) {
            if (error) {
              console.log(error, " Gagal deleted file profile image!");
            } else {
              console.log(result, " Berhasil deleted file profile image!");
            }
          }
        );
      }

      users = {
        profileImg: req.file.path,
        ...users,
      };

      console.log("file >>>>>>>>", { ...req.file });
      await user.update(users, {
        where: { id },
      });
      const userId = await user.findOne({
        where: { id },
        include: [
          { model: pangkas_pohon },
          { model: pju },
          { model: makam_pacekeras },
          { model: rusunawa },
          { model: angkut_jenazah },
          { model: psu },
        ],
      });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully updated user",
        data: userId,
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

//   "id": "3333",
//   "nama": "pupi",
//   "gender": "perempuan",
//   "alamat": "kalimantan",
//   "hp": "12345678",
//   "password": "3333"

// "id": "HANYAUNTUKADMIN2",
// "password": "1234567"
