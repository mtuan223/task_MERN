import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/task/taskSlice";
import { useEffect, useState } from "react";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  //đồng bộ task.text bên ngoài với state 'updatedData' nội bộ
  useEffect(() => {
    if (!isEditing) {
      setUpdatedData(task.text);
    }
  }, [task.text, isEditing]);

  const handleClick = () => {
    // nếu ko sửa, nhấn nút sẽ mở edit mode
    if (!isEditing) {
      setIsEditing(true);
      // thao tác khi save edit
    } else {
      // nếu không có gì thay đổi, trở về lại trạng thái chưa edit
      if (updatedData.trim() === "") {
        setIsEditing(false);
        return;
      }
      const updatedText = { text: updatedData.trim() };
      dispatch(updateTask({ id: task._id, updatedText }));
      setIsEditing(false);
    }
  };

  //  xử lý key enter và escape
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            value={updatedData}
            autoFocus
            onChange={(e) => setUpdatedData(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h2 className="task-title">{task.text}</h2>
        )}

        <p className="task-date">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <button className="update-btn" onClick={handleClick} title="Update Task">
        {isEditing ? "Save" : "Edit"}
      </button>

      {/* Nút X nằm riêng, absolute */}
      <button
        className="close-btn"
        onClick={() => dispatch(deleteTask(task._id))}
        title="Delete task"
      >
        ×
      </button>
    </div>
  );
};

export default TaskItem;
