const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  getAllUser,
  getUserByid,
  addUser,
  deleteUserByid,
  updateUserByid,
} = require("../controllers/user.controller.js");
const { uploadFile } = require("../middlewares/uploadFile.js");

router.get("/", getAllUser);
router.get("/:id", getUserByid);
router.post("/", uploadFile("profileImg"), addUser);
router.delete("/:id", deleteUserByid);
router.put("/:id", uploadFile("profileImg"), updateUserByid);

module.exports = router;
