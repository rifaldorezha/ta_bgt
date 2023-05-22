const express = require("express");
const router = express.Router();

const {
  getAllmakamPacekeras,
  getmakamPacekerasByID,
  // getmakamPacekerasByStatus,
  addmakamPacekeras,
  deletemakamPacekerasByID,
  updatemakamPacekerasByID,
} = require("../controllers/makamPacekeras.controller.js");
const { upload } = require("../middlewares/uploadFile.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", auth, getAllmakamPacekeras);
router.get("/:id", getmakamPacekerasByID);
// router.get("/status/:status", getmakamPacekerasByStatus);
router.post("/", auth, upload.single("file_rekom_rs"), addmakamPacekeras);
router.delete("/:id", deletemakamPacekerasByID);
router.put("/:id", auth, updatemakamPacekerasByID);

module.exports = router;
