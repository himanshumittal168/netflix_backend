const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: "failed", message: "User already exists,Sign In!" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      data: { username, email },
    });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password){
        return res.status(400).json({ status: "failed", message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "User not found, Singup" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid Password" });
    }
    // const token = jwt.sign(
    //   { user_id: user._id },
    //   process.env.SECRET,
    //   {
    //     expiresIn: "5d",
    //   }
    // );
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { username: user.username, email }
    });
  } catch (err) {
    res.status(500).json({ status: "failed", error: err.message });
  }
};

module.exports = { signup, login };