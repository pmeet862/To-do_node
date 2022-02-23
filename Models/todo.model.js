const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todos: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
