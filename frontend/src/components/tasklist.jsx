import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, reset } from "../features/task/taskSlice";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import TaskItem from "./Taskitem";

const TaskList = () => {
  const { isSuccess, isError, isLoading, tasks, message } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();

  // Gọi getTasks khi component mount
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // Xử lý thông báo lỗi/thành công
  useEffect(() => {
    if (isSuccess) {
      // toast.success("Tasks loaded!");
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="content">
      {tasks.length > 0 ? (
        <div className="tasks">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <p>No tasks found. Create one to get started!</p>
      )}
    </section>
  );
};

export default TaskList;
