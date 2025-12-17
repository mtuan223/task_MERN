const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // validation: input validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  // validation: check if user exist or not in DB
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Existed!");
  }
  //add random figure to password before hashing
  const salt = await bcrypt.genSalt(10);
  //hash
  const hashedPassword = await bcrypt.hash(password, salt);
  // SAVE to 'User' model by 'create()'
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // check if new user created successfully in User
  if (user) {
    res.status(201).json({
      //code 201 : 'created' and send info back to client
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user.id), // gen token based on user id
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!"); //throw error to middleware
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // receive info from client
  const user = await User.findOne({ email }); // validate: find existing email in model 'User'
  // compare newly hashed 'password' to existing 'user.password'
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, name, email });
});

const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

module.exports = { registerUser, loginUser, getCurrentUser };
