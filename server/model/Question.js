const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  content: String,
  // postedby: { type: Schema.Types.ObjectId, ref: "User" },
  postedOn: Date,
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  hashTag: [{ type: String }],
});

module.exports = mongoose.model("Question", questionSchema);
