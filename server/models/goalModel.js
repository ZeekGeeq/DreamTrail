const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const goalSchema = new Schema(
  {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Goals", goalSchema);
