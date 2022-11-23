const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  idea: {
    type: String,
    required: true
  },
  details: String
});

module.exports = mongoose.model("Note", noteSchema);
