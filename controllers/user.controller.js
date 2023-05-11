const models = require("../models");
const { user, pangkas_pohon, pju, makam_pacekeras, rusunawa, angkut_jenazah } =
  models;
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const users = req.body;

      // Check username
      const checkId = await user.findOne({
        where: {
          id: users.id,
        },
      });
      if (!checkId) {
        return res.status(500).send({
          status: "failed",
          message: "Username Or Password don't match",
        });
      }

      const isValidPassword = await bcrypt.compare(
        users.password,
        checkId.password
      );
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
        },
        secretKey
      );

      res.status(200).send({
        status: "Success",
        message: "resource succesfully sign In",
        data: {
          id: checkId.id,
          nama: checkId.nama,
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

  // Sign Up
  addUser: async (req, res) => {
    try {
      const users = req.body;

      const checkId = await user.findOne({
        where: {
          id: users.id,
        },
      });
      if (checkId) {
        return res.status(500).send({
          status: "failed",
          message: "Nik Already Registered",
        });
      }

      if (users.id.length < 7) {
        return res.status(500).send({
          status: "failed",
          message: "Id minimal 7 kata!",
        });
      }

      if (users.password.length < 4)
        return res.status(400).send({
          message: "Password minimal 4 kata!",
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
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
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
          ],
          where: { role },
        });
        res.status(200).send({
          status: "Success",
          message: "Get data user role",
          data: {
            users,
          },
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
        where: {
          id: req.userId,
        },
      });
      console.log("uservalidasi >>>", userValidasi);
      console.log("uservalidasi >>>", userValidasi.role);

      if (userValidasi.role === "Admin") {
        await user
          .findOne({ where: { id } })
          .then((file) => {
            if (file) {
              const datavalues = file.dataValues;
              // console.log(datavalues);

              let namaImg = path.basename(datavalues.profileImg);
              // console.log("filename >>>>", fileName);
              fs.unlink(`public/profileImages/${namaImg}`, (err) => {
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
        const users = await user.destroy({
          where: {
            id,
          },
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

    try {
      const a = await user
        .findOne({ where: { id } })
        .then((file) => {
          if (file) {
            const datavalues = file.dataValues;
            // console.log(datavalues);

            let namaImg = path.basename(datavalues.profileImg);
            // console.log("filename >>>>", fileName);
            fs.unlink(`public/profileImages/${namaImg}`, (err) => {
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

      const pathfile = process.env.PATH_FILE_PROFILE;
      let users = req.body;
      users = {
        profileImg: pathfile + req.files.profileImg[0].filename,
        ...users,
      };

      console.log("file >>>>>>>>", { ...req.files });

      let userData = await user.update(users, {
        where: {
          id: id,
        },
      });
      const userId = await user.findOne({
        where: {
          id,
        },
        include: [
          { model: pangkas_pohon },
          { model: pju },
          { model: makam_pacekeras },
          { model: rusunawa },
          { model: angkut_jenazah },
        ],
      });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully updated user",
        data: {
          userId,
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

//   "id": "3333",
//   "nama": "pupi",
//   "gender": "perempuan",
//   "alamat": "kalimantan",
//   "hp": "12345678",
//   "password": "3333"

// "id": "12345",
// "password": "1234567"
