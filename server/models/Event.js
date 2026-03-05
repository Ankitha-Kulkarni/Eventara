const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  title: String,
  date: String,
  category: String,
  image: String,
  description: String,

  price: {
    type: Number,
    default: 200
  },

  seats: {
    type: [Boolean],
    default: Array(40).fill(false)
  }

});

module.exports = mongoose.model("Event", eventSchema);