const express = require("express");
const router = express.Router();

const {
  getAllpju,
  getpjuByID,
  addpju,
  deletepjuByID,
  updatepjuByID,
  updateBuktipjuByID,
} = require("../controllers/pju.controller.js");
const { auth } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/uploadFile.js");

router.get("/", auth, getAllpju);
router.get("/:id", getpjuByID);
router.post("/", auth, addpju);
router.delete("/:id", deletepjuByID);
router.put("/:id", auth, updatepjuByID);
router.put(
  "/bukti/:id",
  auth,
  upload.single("bukti_pjuImg"),
  updateBuktipjuByID
);

module.exports = router;
