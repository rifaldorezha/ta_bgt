const models = require("../models");
const { user, pangkas_pohon, pju, makam_pacekeras, rusunawa } = models;
const path = require("path");
const fs = require("fs");

module.exports = {
  login: (req, res) => {},

  logout: async (req, res) => {},

  getAllUser: async (req, res) => {
    try {
      const users = await user.findAll({
        include: [
          { model: pangkas_pohon },
          { model: pju },
          { model: makam_pacekeras },
          { model: rusunawa },
        ],
        // attributes: {
        //   exclude: ["createdAt", "updatedAt", "address", "password", "listId"],
        // },
      });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully get",
        data: {
          users,
        },
      });
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
        ],
        // attributes: {
        //   exclude: ["createdAt", "updatedAt", "address"],
        // },
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

  addUser: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    try {
      const users = req.body;
      const path = process.env.PATH_FILE_PROFILE;
      console.log({ ...users });
      const add = await user.create({
        ...users,
        profileImg: path + req.files.profileImg[0].filename,
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

  deleteUserByid: async (req, res) => {
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

      const users = await user.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        status: "Success",
        message: "resource has successfully deleted user",
      });
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

    try {
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

// const data = req.body;
// try {
//   let response = await user.create(data);
//   res.json({
//     message: "success add data user",
//     send: response,
//   });
// } catch (e) {
//   res.status(404).send("Gagal menambahkan data user");
// }

// const data = req.body;
// const { id } = req.params;
// try {
//   const users = await user.findByPk(id);

//   Object.assign(users, data);
//   users.save();
//   res.status(201).send({
//     message: "User updated!",
//     data: users,
//   });
// } catch (error) {
//   res.status(404).json({ message: "Data tidak ditemukan" });
// }

// const filepath = path.resolve("public/profileImages/", users.profileImg);
// console.log("filepath >>>>> ", filepath);
// fs.unlink(filepath);
