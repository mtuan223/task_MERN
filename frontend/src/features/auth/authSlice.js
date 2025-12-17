// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Lấy thông tin user lưu từ localStorage của trình duyệt (ví dụ JWT) -> duy trì đăng nhập
// localStorage chứa string -> JSON.parse(...) chuyển về JavaScript object cho code
const localuser = JSON.parse(localStorage.getItem("user"));

// khai báo state ban đầu
const initialState = {
  user: localuser ? localuser : null, // có thể null nếu user chưa login
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register", // tham số đầu: prefix của action.
  // hàm 'createAsyncThunk' là thunk sẽ tự động tạo 3 action ứng với các case promise:
  // auth/register/pending
  // auth/register/fulfilled
  // auth/register/rejected
  async (user, thunkAPI) => {
    // tham số 2: nhận vào user data từ component và thunkAPI: chứa nhiều tiện ích (vd: rejectWithValue)
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
      // trả lỗi về slice kèm message,
      // tạo action register.rejected với payload = message
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  //thunk sẽ tự động tạo 3 action ứng với các case promise:
  // auth/logout/pending
  // auth/logout/fulfilled
  // auth/logout/rejected
  "auth/logout",
  async () => await authService.logout()
);

// tạo slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // hàm reset các hiển thị này về mặc định khi người dùng done/reload...
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // dùng cho các thao tác state nhận từ bên ngoài
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // lưu các user data nhận từ thunk
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer; // 1 hàm hợp nhất các reducers
export const { reset } = authSlice.actions;
