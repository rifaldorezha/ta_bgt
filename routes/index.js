const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const userRouter = require("./user.router.js");
const pangkas_pohonRouter = require("./pangkas_pohon.router.js");
const pjuRouter = require("./pju.router.js");
const makamRouter = require("./makam_pacekeras.router.js");
const rusunawaRouter = require("./rusunawa.router.js");

router.use("/user", userRouter);
router.use("/pangkas_pohon", pangkas_pohonRouter);
router.use("/pju", pjuRouter);
router.use("/makam_pacekeras", makamRouter);
router.use("/rusunawa", rusunawaRouter);

module.exports = router;
