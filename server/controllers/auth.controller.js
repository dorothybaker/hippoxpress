import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email address is already taken!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json("User created successfully!");
    } else {
      res.status(400).json({ error: "Invalid user data provided!" });
    }
  } catch (error) {
    return res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json("Invalid email address or password!");
    }

    generateToken(user._id, res);

    res.status(200).json("Logged in successfully!");
  } catch (error) {
    return res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("hippoxpress");
    res.status(200).json("Logged out successfully!");
  } catch (error) {
    return res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message || "Internal Server Error!");
  }
};
