const mongoose = require("mongoose");
const { Schema } = mongoose;

const TIER = [1, 2, 3, 4, 5, 6];

const userSchema = new Schema({
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
  bio: String,
  tier: { type: Number, enum: TIER, default: TIER[0] },
  hashTag: [{ type: String }],
  answeredQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  memberSince: Date,
});

module.exports = mongoose.model("User", userSchema);
