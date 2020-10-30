const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema({
  date: { type: String, required: true },
  weight: { type: Number, required: true },
  comment: { type: String },
});

const weightData = mongoose.model("Data", weightSchema);

module.exports = weightData;
