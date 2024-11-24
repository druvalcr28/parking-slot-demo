// seeds/[timestamp]_update_booking_time.js

exports.seed = async function (knex) {
  // Fetch all parking slots with a non-null booked_by value
  const slots = await knex("parking_slots").whereNotNull("booked_by");

  // Update the booking_time for each slot
  const updates = slots.map((slot) =>
    knex("parking_slots")
      .where("id", slot.id)
      .update({ booking_time: knex.fn.now() })
  );

  // Execute all updates
  await Promise.all(updates);
};
