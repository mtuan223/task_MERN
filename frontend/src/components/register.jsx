import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "./spinner";

const Register = () => {
  // Tạo state formData chứa dữ liệu người dùng nhập vào
  const [formData, setFormData] = useState({
    //Mọi thao tác thay đổi state phải thông qua hàm setFormData
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  // Destructure cho tiện sử dụng
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth // lấy state trong slice auth
  );

  useEffect(() => {
    // hành động được thực hiện sau khi render
    if (isSuccess) {
      navigate("/");
      toast.success("Register successful!");
      dispatch(reset()); // đặt lại các state về default
      return;
    }
    if (isError) {
      toast.error(message);
      dispatch(reset()); //đặt lại các state về default
      return;
    }
  }, [isSuccess, isError, message]);

  // hàm xử lý khi người dùng nhập vào ô input
  const onChange = (e) => {
    // e là event object xảy ra, giúp ta thu được thông tin về event đó
    // e.target.name là 'name', 'email', 'password', hoặc 'password2'
    setFormData((prevState) => ({
      ...prevState, //giữ nguyên các giá trị cũ khi cập nhật
      [e.target.name]: e.target.value, // cập nhật trường tương ứng
    }));
    // () => ({}) là cách return giá trị implicitly mà ko phải viết "return"
  };

  //Hàm xử lý khi người dùng nhấn submit
  const onSubmit = (e) => {
    e.preventDefault(); //chặn tải lại trang
    if (password !== password2) {
      toast.error("Passwords are not match!");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name" // phải khớp với tên thuộc tính trong formData state để onChange() theo dõi dữ liệu nào đang được cập nhật (dùng để cập nhật)
              value={name} // giúp đồng bộ state và UI (dùng để hiển thị 'name 'state )
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>

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

export default Register;
