const express = require("express");
const router = express.Router();

const {
  login,
  checkAuth,
  getAllUser,
  getUserByid,
  addUser,
  deleteUserByid,
  updateUserByid,
} = require("../controllers/user.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllUser);
router.get("/users/:id", getUserByid);
router.post("/register", addUser);
router.post("/login", login);
router.get("/check_auth", auth, checkAuth);
router.delete("/users/:id", auth, deleteUserByid);
router.put("/users/:id", upload.single("profileImg"), updateUserByid);

module.exports = router;
