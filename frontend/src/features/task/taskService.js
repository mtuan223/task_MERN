import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "/api/tasks/";

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, taskData, config); // POST nhận 3 tham số
  return response.data;
};

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config); // GET nhận 2 tham số
  return response.data;
};

const updateTask = async (id, updatedText, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + id, updatedText, config);
  return response.data;
};

const deleteTasks = async (token, task_id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + task_id, config); // DELETE nhận 2 tham số
  return response.data;
};

const taskService = { createTask, getTasks, updateTask, deleteTasks };
export default taskService;
