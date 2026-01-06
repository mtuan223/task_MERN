const {
  getTasks,
  setTask,
  updateTasks,
} = require("../controllers/taskController");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Mock models
jest.mock("../models/taskModel");
jest.mock("../models/userModel");

// ----------------------
// TEST getTasks
test("should get tasks for a user", async () => {
  // mock req
  const req = {
    user: {
      id: "user-id",
    },
  };
  //mock task for the user
  const tasks = [
    { _id: "task-id-1", text: "Task 1", user: "user-id" },
    { _id: "task-id-2", text: "Task 2", user: "user-id" },
  ];
  // Mocking the find method to return tasks for the user
  Task.find.mockResolvedValue(tasks);
  // Mock res object
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  // Call controller
  await getTasks(req, res);
  //Ensure that the response contains the expected tasks
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(tasks);
});

// ----------------------
// TEST setTasks
test("should set a new task for a user", async () => {
  const req = {
    user: { id: "user-id" },
    body: { text: "New Task" },
  };
  const task = {
    _id: "new-task-id",
    text: "New Task",
    user: "user-id",
  };
  Task.create.mockResolvedValue(task);
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  await setTask(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(task);
});

// TEST setTask error
test("should return a 400 error for missing task text", async () => {
  const req = {
    user: { id: "user-id" },
    body: {}, // thiếu text
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  await expect(setTask(req, res)).rejects.toThrow("Please enter a task");
  expect(res.status).toHaveBeenCalledWith(400);
});

// ----------------------
// UPDATE TASK — USER NOT FOUND
test("should return a 401 error if user is not found", async () => {
  const taskId = "task-id-1";
  const userId = "non-existent-user-id";

  const req = {
    params: { id: taskId },
    user: { id: userId },
    body: { text: "Updated Task" },
  };

  const taskToUpdate = {
    _id: taskId,
    text: "Original Task",
    user: "user-id",
  };

  Task.findById.mockResolvedValue(taskToUpdate);
  User.findById.mockResolvedValue(null);

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(updateTasks(req, res)).rejects.toThrow("No such user found");

  expect(res.status).toHaveBeenCalledWith(401);
});

//  UPDATE TASK — USER NOT AUTHORIZED
test("should return a 401 error if user is not authorized to update the task", async () => {
  const taskId = "task-id-1";
  const userId = "user-id-2";

  const req = {
    params: { id: taskId },
    user: { id: userId },
    body: { text: "Updated Task" },
  };

  const taskToUpdate = {
    _id: taskId,
    text: "Original Task",
    user: "user-id-1",
  };

  Task.findById.mockResolvedValue(taskToUpdate);
  User.findById.mockResolvedValue({ _id: userId });

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(updateTasks(req, res)).rejects.toThrow(
    "User is not authorized to update"
  );

  expect(res.status).toHaveBeenCalledWith(401);
});
