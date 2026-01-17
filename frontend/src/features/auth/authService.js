import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api/users/";
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    // chuyển JSON trả về từ backend thành js object và lưu vào localStorage
    // có thể dùng để Tự động đăng nhập, giữ phiên đăng nhập...
  }
  return response.data;
  // trả dữ liệu về asyncThunk
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    // chuyển JSON trả về từ backend thành js object và lưu vào localStorage
    // có thể dùng để Tự động đăng nhập, giữ phiên đăng nhập...
  }
  return response.data;
  // trả dữ liệu về asyncThunk
};

const logout = () => localStorage.removeItem("user");

const authService = { register, login, logout };
export default authService;
