const express = require("express");
const router = express.Router();

const {
  getAllpsu,
  getpsuByID,
  addpsu,
  deletepsuByID,
  updatepsuByID,
} = require("../controllers/psu.controller.js");
const { uploadFile } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", getAllpsu);
router.get("/:id", getpsuByID);
router.post(
  "/",
  auth,
  uploadFile(
    "file_ktp_pemohon",
    "file_data_perusahaan",
    "file_sertifikat_tanah",
    "file_data_ijin_pendukung",
    "file_kop_surat_perusahaan"
  ),
  addpsu
);
router.delete("/:id", deletepsuByID);
router.put("/:id", auth, updatepsuByID);

module.exports = router;
