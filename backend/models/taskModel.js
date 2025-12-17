const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // tham chiếu đến cột user id
      required: true,
      ref: "User", // tạo relationship với user model
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema); //Tạo Model "Task" từ schema. Model là "class" để interact với collection.
