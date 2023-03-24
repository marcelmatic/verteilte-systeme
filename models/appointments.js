const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    insurance: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = Appointments;
