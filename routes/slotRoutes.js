// routes/slotRoutes.js
const express = require("express");
const {
  getAllSlots,
  bookSlot,
  releaseSlot,
  addSlot,
  deleteSlot,
  calculateAmount,
} = require("../controllers/slotController");

const router = express.Router();

router.get("/", getAllSlots);
router.get("/amount/:slotId", calculateAmount);
router.post("/book/:slotId", bookSlot);
router.post("/release/:slotId", releaseSlot);
router.post("/", addSlot);
router.delete("/:slotId", deleteSlot);

module.exports = router;
