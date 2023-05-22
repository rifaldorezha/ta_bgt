const express = require("express");
const router = express.Router();

const {
  getAllangkutJenazah,
  getangkutJenazahByID,
  // getangkutJenazahByStatus,
  addangkutJenazah,
  deleteangkutJenazahByID,
  updateangkutJenazahByID,
} = require("../controllers/angkutJenazah.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllangkutJenazah);
router.get("/:id", getangkutJenazahByID);
// router.get("/status/:status", getangkutJenazahByStatus);
router.post("/", auth, upload.single("file_angkut_jenazah"), addangkutJenazah);
router.delete("/:id", deleteangkutJenazahByID);
router.put("/:id", auth, updateangkutJenazahByID);

module.exports = router;
