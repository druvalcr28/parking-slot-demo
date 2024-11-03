// models/Parkingslot.js
const db = require("../config/db");

const getAllSlots = () => {
  return db.query(
    `SELECT
      ps.slot_number, 
      u.username AS booked_by 
    FROM 
      parking_slots ps
    LEFT JOIN 
      users u 
    ON 
      ps.booked_by = u.id`
  );
};

const validateUser = async (username) => {
  try {
    const result = await db.query(
      "SELECT id, username FROM users WHERE username = $1",
      [username]
    );
    if (result.rowCount > 0) {
      return result.rows[0]; // Returns user object if found
    }
    return null; // Returns null if user is not found
  } catch (error) {
    console.error("Error validating user:", error);
    throw error;
  }
};

const getSlotStatus = (slotId) => {
  return db
    .query("SELECT booked_by FROM parking_slots WHERE slot_number = $1", [
      slotId,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("Slot not found");
      }
      return result.rows[0].booked_by ? "occupied" : "available";
    });
};

const bookSlot = (slotId, userId) => {
  return db.query(
    "UPDATE parking_slots SET booked_by = $1 WHERE slot_number = $2",
    [userId, slotId]
  );
};

const releaseSlot = (slotId) => {
  return db.query(
    "UPDATE parking_slots SET booked_by = NULL WHERE slot_number = $1",
    [slotId]
  );
};

const addSlot = (slotNumber) => {
  return db.query("INSERT INTO parking_slots (slot_number) VALUES ($1)", [
    slotNumber,
  ]);
};

const deleteSlot = (slotNumber) => {
  return db.query("DELETE FROM parking_slots WHERE slot_number = $1", [
    slotNumber,
  ]);
};

module.exports = {
  getAllSlots,
  validateUser,
  getSlotStatus,
  bookSlot,
  releaseSlot,
  addSlot,
  deleteSlot,
};
