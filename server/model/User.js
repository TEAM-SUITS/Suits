const mongoose = require("mongoose");

const TIER = [1, 2, 3, 4, 5, 6];

const userSchema = new mongoose.Schema({
  githubId: {
    required: true,
    type: String,
  },

  githubRepo: {
    type: String,
  },

  avatar: {
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

  tier: { type: Number, enum: TIER, default: TIER[0] },

  hashTag: [{}],
});

module.exports = mongoose.model("User", userSchema);
