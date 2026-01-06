const { registerUser } = require("../controllers/userController");

// Mock User model (mock DB model)
jest.mock("../models/userModel", () => {
  const mockUser = {
    _id: "user-id",
    name: "John Doe",
    email: "johndoe@example.com",
  };
  return {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(mockUser),
  };
});

// Mock JWT and bcrypt
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mock-token"),
}));
const bcrypt = require("bcryptjs");
bcrypt.genSalt = jest.fn().mockResolvedValue("msock-salt");
bcrypt.hash = jest.fn().mockResolvedValue("mock-hashedpassword");

// Test case 1: Đăng ký thành công
test("should register a new user", async () => {
  // create mock req
  const req = {
    body: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  await registerUser(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
});

// Test case 2: Thiếu field → lỗi 400
test("should return a 400 error if any field is missing", async () => {
  const req = {
    body: {
      name: "John Doe",
      email: "", // thiếu email
      password: "password",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(registerUser(req, res)).rejects.toThrow(
    "All fields are mandatory"
  );
  expect(res.status).toHaveBeenCalledWith(400);
});
