const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: {
    required: true,
    type: String,
  },

  username: {
    required: true,
    type: String,
  },

  dailyPostLimit: {
    type: Number,
    default: 3,
  },
});

module.exports = mongoose.model("User", userSchema);
