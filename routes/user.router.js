const express = require("express");
const router = express.Router();

const {
  login,
  getAllUser,
  getUserByid,
  addUser,
  deleteUserByid,
  updateUserByid,
} = require("../controllers/user.controller.js");
const { uploadFile } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllUser);
router.get("/:id", getUserByid);
router.post("/register", addUser);
router.post("/login", login);
router.delete("/:id", auth, deleteUserByid);
router.put("/:id", uploadFile("profileImg"), updateUserByid);

module.exports = router;
