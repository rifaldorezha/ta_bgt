const express = require("express");
const router = express.Router();

const {
  login,
  checkAuth,
  getAllUser,
  getAllpengaduanbyAuth,
  getUserByid,
  addUser,
  deleteUserByid,
  updateUserByid,
  addRecordJumlahLayanan,
  getCountJumlahLayananPerUser,
} = require("../controllers/user.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllUser);
router.get("/users/:id", getUserByid);
router.post("/register", addUser);
router.post("/login", login);
router.get("/check_auth", auth, checkAuth);
router.get("/pengaduan/auth/", auth, getAllpengaduanbyAuth);
router.delete("/users/:id", auth, deleteUserByid);
router.put("/users/:id", upload.single("profileImg"), updateUserByid);

router.post("/jumlah_layanan", auth, addRecordJumlahLayanan);
router.get("/jumlah_layanan", auth, getCountJumlahLayananPerUser);

module.exports = router;
