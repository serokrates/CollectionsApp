const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, status, role } = req.body;
  if (!name || !email || !password || !status || !role) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }
  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user exists");
  }
  // hash the user password

  // https://www.techtarget.com/searchsecurity/definition/salt

  // Password salting is a technique to protect passwords stored
  // in databases by adding a string of 32 or more characters and
  // then hashing them. Salting prevents hackers who breach an enterprise
  // environment from reverse-engineering passwords and stealing them
  // from the database.

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    status,
    role,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }

  // res.status(200).json({message: 'Register User'})
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // find email of the user
  const user = await User.findOne({ email });

  //
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    email === user.email &&
    name === user.name &&
    user.status &&
    user.status === "active"
  ) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getAllRegisteredUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.body.userID);
  res.status(200).json({ id: req.body.userID });
});
const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("goal notfound");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllRegisteredUsers,
  deleteUser,
  blockUser,
};
