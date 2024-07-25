const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter animal name"],
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  soundUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Animal", animalSchema);
