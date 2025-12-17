import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // hook useState() trả về 1 mảng gồm 2 phần tử, ta destruct ra và đặt tên chúng trong []
  // 1. giá trị state hiện tại
  // 2. Một hàm dùng để cập nhật giá trị state đó.

  //destructuring
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
      return;
    }
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
      return;
    }
  }, [isError, isSuccess, user, message]);

  //hàm xử lý onChange chỉ bắt sự kiện 'thay đối' trong form
  const onChange = (e) => {
    // e.target.name là 'email' hoặc 'password'
    // e.target.value là giá trị người dùng nhập
    setFormData((prevState) => ({
      // gọi hàm setFormData cập nhật state từ dữ liệu mới trên form, nhận đối số là giá trị mới của state
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // hàm xử lý khi submit form
  const onSubmit = (e) => {
    e.preventDefault(); // chặn reload trang mặc định sau khi submit
    const userData = { email, password };
    dispatch(login(userData));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {/* Tiêu đề trang */}
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start creating tasks</p>
      </section>

      {/* Form đăng nhập */}
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email" // tên key của trường này khi gửi đi và react theo dõi cập nhật
              onChange={onChange} // nghe và lưu input -> state. kích hoạt onChange khi có thay đổi từ form
              value={email} // update hiển thị lại giá trị từ state
              placeholder="Enter your email"
              required="required"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              onChange={onChange}
              value={password}
              placeholder="Enter password"
              required="required"
            />
          </div>
          {/* submit button */}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
