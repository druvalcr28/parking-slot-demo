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

const addSlot = async (req, res) => {
  const { slotNumber } = req.body;

  if (!slotNumber) {
    return res.status(400).json({ error: "Slot number is required" });
  }

  try {
    await ParkingSlot.addSlot(slotNumber);
    res.status(201).json({
      message: `Parking slot ${slotNumber} created successfully`,
    });
  } catch (error) {
    if (error.code === "23505") {
      // PostgreSQL unique violation error code
      return res.status(400).json({
        error: `Slot number ${slotNumber} already exists`,
      });
    }
    console.error("Error adding slot:", error);
    res.status(500).json({ error: "Failed to add parking slot" });
  }
};

const deleteSlot = async (req, res) => {
  const { slotId } = req.params;

  try {
    const result = await ParkingSlot.deleteSlot(slotId);
    if (result.rowCount === 0) {
      return res.status(404).json({
        error: `Slot number ${slotId} not found`,
      });
    }
    res.json({
      message: `Parking slot ${slotId} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ error: "Failed to delete parking slot" });
  }
};

module.exports = { getAllSlots, bookSlot, releaseSlot, addSlot, deleteSlot };
