const express = require("express");
const router = express.Router();

const {
  getAllpsu,
  getpsuByID,
  addpsu,
  deletepsuByID,
  updatepsuByID,
} = require("../controllers/psu.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllpsu);
router.get("/:id", getpsuByID);
router.post(
  "/",
  auth,
  upload.fields([
    { name: "file_ktp_pemohon", maxCount: 1 },
    { name: "file_data_perusahaan", maxCount: 1 },
    { name: "file_sertifikat_tanah", maxCount: 1 },
    { name: "file_data_ijin_pendukung", maxCount: 1 },
    { name: "file_kop_surat_perusahaan", maxCount: 1 },
  ]),
  addpsu
);
router.delete("/:id", deletepsuByID);
router.put("/:id", auth, updatepsuByID);

module.exports = router;
