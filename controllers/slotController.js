// controllers/slotController.js
const ParkingSlot = require("../models/Parkingslot");

const getAllSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.getAllSlots();
    res.json(slots.rows);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
};

const bookSlot = async (req, res) => {
  const { slotId } = req.params;
  const { username } = req.body; // Expecting username in the request body

  if (!username) {
    return res.status(400).json({ error: "Username is required for booking" });
  }

  try {
    const userDetails = await ParkingSlot.validateUser(username);
    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    const slotStatus = await ParkingSlot.getSlotStatus(slotId);
    if (slotStatus === "occupied") {
      return res.status(400).json({ error: "Slot is already occupied" });
    }

    await ParkingSlot.bookSlot(slotId, userDetails.id);
    res.json({ message: `Slot ${slotId} booked by ${username}` });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ error: "Failed to book slot" });
  }
};

const releaseSlot = async (req, res) => {
  const { slotId } = req.params;

  try {
    await ParkingSlot.releaseSlot(slotId);
    res.json({ message: `Slot ${slotId} released` });
  } catch (error) {
    console.error("Error releasing slot:", error);
    res.status(500).json({ error: "Failed to release slot" });
  }
};

module.exports = { getAllSlots, bookSlot, releaseSlot };
