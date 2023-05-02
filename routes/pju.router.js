const express = require("express");
const router = express.Router();

const {
  getAllpju,
  getpjuByID,
  addpju,
  deletepjuByID,
  updatepjuByID,
} = require("../controllers/pju.controller.js");

router.get("/", getAllpju);
router.get("/:id", getpjuByID);
router.post("/", addpju);
router.delete("/:id", deletepjuByID);
router.put("/:id", updatepjuByID);

module.exports = router;
