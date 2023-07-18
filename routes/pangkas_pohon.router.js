const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/auth");

const {
  getAllPangkas_pohon,
  getPangkas_pohonByID,
  addPangkas_pohon,
  deletePangkas_pohonByID,
  updatePangkas_pohonByID,
  updateBuktiPangkas_pohonByID,
} = require("../controllers/pangkas_pohon.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllPangkas_pohon);
router.get("/:id", getPangkas_pohonByID);
router.post("/", auth, upload.single("pohonImg"), addPangkas_pohon);
router.delete("/:id", deletePangkas_pohonByID);
router.put("/:id", auth, updatePangkas_pohonByID);
router.put(
  "/bukti/:id",
  auth,
  upload.single("bukti_pohonImg"),
  updateBuktiPangkas_pohonByID
);

module.exports = router;
