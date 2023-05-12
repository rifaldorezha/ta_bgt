const express = require("express");
const router = express.Router();

const {
  getAllrusunawa,
  getrusunawaByID,
  addrusunawa,
  deleterusunawaByID,
  updaterusunawaByID,
} = require("../controllers/rusunawa.controller.js");
const { uploadFile } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", getAllrusunawa);
router.get("/:id", getrusunawaByID);
router.post("/", auth, uploadFile("file_ktp", "file_kk"), addrusunawa);
router.delete("/:id", deleterusunawaByID);
router.put("/:id", auth, updaterusunawaByID);

module.exports = router;
