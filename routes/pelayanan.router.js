const express = require("express");
const router = express.Router();

const {
  getAllPelayanan,
  getPelayananByID,
  addPelayanan,
  deletePelayananByID,
  updatePelayananByID,
} = require("../controllers/pelayanan.controller.js");
const { auth } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/uploadFile.js");

router.get("/", getAllPelayanan);
router.get("/:id", getPelayananByID);
router.post("/", addPelayanan);
router.delete("/:id", deletePelayananByID);
router.put("/:id", updatePelayananByID);

module.exports = router;
