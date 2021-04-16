const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const questionSchema = new Schema({
  content: String,
  // postedby: { type: Schema.Types.ObjectId, ref: "User" },
  postedOn: Date,
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  hashTag: [{ type: String }],
});

questionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Question", questionSchema);
