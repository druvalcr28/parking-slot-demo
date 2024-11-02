// controllers/slotController.js
const ParkingSlot = require("../models/Parkingslot");

const getAllSlots = async (req, res) => {
  const slots = await ParkingSlot.getAllSlots();
  res.json(slots.rows);
};

const bookSlot = async (req, res) => {
  const { slotId } = req.params;
  await ParkingSlot.bookSlot(slotId);
  res.json({ message: `Slot ${slotId} booked` });
};

const releaseSlot = async (req, res) => {
  const { slotId } = req.params;
  await ParkingSlot.releaseSlot(slotId);
  res.json({ message: `Slot ${slotId} released` });
};

module.exports = { getAllSlots, bookSlot, releaseSlot };
