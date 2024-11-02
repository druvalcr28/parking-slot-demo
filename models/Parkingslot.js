// models/Parkingslot.js
const db = require("../config/db");

const getAllSlots = () => {
  return db.query("SELECT * FROM parking_slots");
};

const bookSlot = (slotId) => {
  return db.query("UPDATE parking_slots SET status = $1 WHERE id = $2", [
    "occupied",
    slotId,
  ]);
};

const releaseSlot = (slotId) => {
  return db.query("UPDATE parking_slots SET status = $1 WHERE id = $2", [
    "available",
    slotId,
  ]);
};

module.exports = { getAllSlots, bookSlot, releaseSlot };
