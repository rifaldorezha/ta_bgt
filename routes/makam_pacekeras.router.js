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
const { uploadFile } = require("../middlewares/uploadFile.js");

router.get("/", getAllmakamPacekeras);
router.get("/:id", getmakamPacekerasByID);
// router.get("/status/:status", getmakamPacekerasByStatus);
router.post("/", uploadFile("file_rekom_rs"), addmakamPacekeras);
router.delete("/:id", deletemakamPacekerasByID);
router.put("/:id", uploadFile("file_rekom_rs"), updatemakamPacekerasByID);

module.exports = router;
