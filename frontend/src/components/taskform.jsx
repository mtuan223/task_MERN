import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, createTask } from "../features/task/taskSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./spinner";

const TaskForm = () => {
  //Khai báo state cục bộ
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.task);

  //Hàm xử lý submit form
  const onSubmit = (e) => {
    e.preventDefault();
    // validations thay cho required
    if (!text.trim()) {
      toast.error("Please enter a task!");
      return;
    }
    dispatch(createTask({ text })); // ngoặc {} tạo 1 object có key là text, value là state
    // đặt lại input sau khi submit
    setText("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task created!");
      dispatch(reset());
      navigate("/tasklist");
      return;
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
      return;
    }
  }, [isError, isSuccess, message]);

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          {/* liên kết label với input bằng htmlFor và id */}
          <label htmlFor="text" style={{ fontWeight: "bolder" }}>
            Task
          </label>
          <input
            type="text"
            name="text" // key name khi gửi
            id="text" // liên kết focus với htmlFor
            onChange={(e) => setText(e.target.value)} // ghi nhận khi input được nhập vào
            value={text} // thiết lập liên kết input với state 'value'
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add tasks
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
