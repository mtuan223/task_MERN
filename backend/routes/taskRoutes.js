const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTasks,
  deleteTasks,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getTasks);
router.post("/", protect, setTask);
router.put("/:id", protect, updateTasks); //id là của người dùng send tới
router.delete("/:id", protect, deleteTasks);

module.exports = router;
