module.exports = {
  // Hiển thị tên từng test case khi chạy
  verbose: true,

  // Các glob pattern mà Jest sử dụng để phát hiện các tệp kiểm tra
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Môi trường chạy test (Backend thường dùng 'node')
  testEnvironment: "node",

  // Bỏ qua các thư mục không cần thiết để tăng tốc độ
  testPathIgnorePatterns: ["/node_modules/"],
};
