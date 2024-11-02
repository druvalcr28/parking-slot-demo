// routes/slotRoutes.js
const express = require("express");
const {
  getAllSlots,
  bookSlot,
  releaseSlot,
} = require("../controllers/slotController");

const router = express.Router();

router.get("/", getAllSlots);
router.post("/book/:slotId", bookSlot);
router.post("/release/:slotId", releaseSlot);

module.exports = router;
