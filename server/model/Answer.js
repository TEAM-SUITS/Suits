const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  content: String,
  postedby: { type: Schema.Types.ObjectId, ref: "User" },
  postedOn: { type: Date, default: Date.now },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Answer", answerSchema);
