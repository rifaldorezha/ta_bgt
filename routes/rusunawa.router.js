const express = require("express");
const router = express.Router();

const {
  getAllrusunawa,
  getrusunawaByID,
  addrusunawa,
  deleterusunawaByID,
  updaterusunawaByID,
} = require("../controllers/rusunawa.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", getAllrusunawa);
router.get("/:id", getrusunawaByID);
router.post(
  "/",
  auth,
  upload.fields([
    { name: "file_ktp", maxCount: 1 },
    { name: "file_kk", maxCount: 1 },
  ]),
  addrusunawa
);
router.delete("/:id", deleterusunawaByID);
router.put("/:id", auth, updaterusunawaByID);

module.exports = router;
