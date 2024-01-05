const mongoose = require("mongoose");

const Schema = mongoose.Schema;
console.log("Defining schema...");
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  initialWeight: {
    type: Number,
    required: false,
    default: null,
  },
  currentWeight: {
    type: Number,
    required: false,
  },

  height: {
    type: Number,
    required: false,
  },

  attendanceDays: {
    type: [String], // An array of strings representing days of the week (e.g., ['Monday', 'Wednesday', 'Friday'])
    required: true,
  },
  points: {
    type: Number,
    default: 0, // Initial points set to 0
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
console.log("Creating model...");
module.exports = mongoose.model("Student", StudentSchema);
