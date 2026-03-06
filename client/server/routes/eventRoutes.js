const express = require("express");
const router = express.Router();
const Event = require("../models/Event");


// GET all events
router.get("/", async (req, res) => {

  const events = await Event.find();
  res.json(events);

});


// GET single event
router.get("/:id", async (req, res) => {

  const event = await Event.findById(req.params.id);
  res.json(event);

});


// ADD event
router.post("/", async (req, res) => {

  const event = new Event(req.body);
  const saved = await event.save();

  res.json(saved);

});


// BOOK SEATS
router.post("/book/:id", async (req, res) => {
  const { seats } = req.body;

  const event = await Event.findById(req.params.id);

  seats.forEach(index => {
    event.seats[index] = true;
  });

  await event.save();

  res.json(event);
});// UPDATE EVENT

router.put("/:id", async (req, res) => {

  const updated = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);

});


module.exports = router;