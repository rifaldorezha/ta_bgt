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
const { uploadFile } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", getAllangkutJenazah);
router.get("/:id", getangkutJenazahByID);
// router.get("/status/:status", getangkutJenazahByStatus);
router.post("/", auth, uploadFile("file_angkut_jenazah"), addangkutJenazah);
router.delete("/:id", deleteangkutJenazahByID);
router.put(
  "/:id",
  auth,
  uploadFile("file_angkut_jenazah"),
  updateangkutJenazahByID
);

module.exports = router;
