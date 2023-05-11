const express = require("express");
const router = express.Router();

const {
  getAllpju,
  getpjuByID,
  addpju,
  deletepjuByID,
  updatepjuByID,
} = require("../controllers/pju.controller.js");
const { auth } = require("../middlewares/auth.js");

router.get("/", getAllpju);
router.get("/:id", getpjuByID);
router.post("/", auth, addpju);
router.delete("/:id", deletepjuByID);
router.put("/:id", auth, updatepjuByID);

module.exports = router;
