const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }); // only find task with the 'user info' returned from the middleware
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.text) {
    res.status(400);
    throw new Error("Please enter a task");
  }
  const task = await Task.create({
    // create new task with 'text' field and user id ()
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(task);
});

const updateTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id); // tìm task trong DB bằng task id người dùng gửi đến
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id); // tìm lại user mới nhất còn được active ko, và kiểm quyền của user với task
  if (!user) {
    res.status(401); // unauthorized, người dùng chưa xác thực
    throw new Error("No such user found!");
  }

  if (task.user.toString() !== user.id) {
    // ** so sánh ID user của task trong DB với ID user request
    res.status(401);
    throw new Error("User is not authorized to update");
  }
  //ko có lỗi gì, move đến bước này
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // req.body là dữ liệu mới để cập nhật theo
  });

  res.status(200).json(updatedTask); // return the updated task
});

const deleteTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }
  const user = await User.findById(req.user.id); // tìm lại user mới nhất còn được active ko, và kiểm quyền của user với task
  if (!user) {
    res.status(401); // unauthorized, ko có người dùng
    throw new Error("No such user found!");
  }

  if (task.user.toString() !== user.id) {
    // ** so sánh ID user của task trong DB với ID user request
    res.status(401);
    throw new Error("User is not authorized to delete!");
  }
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id }); //return the deleted id
});

module.exports = { getTasks, setTask, updateTasks, deleteTasks };
