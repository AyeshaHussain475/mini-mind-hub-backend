import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    }).exec();

    if (existingUser) {
      return res.status(400).json({
        message: "User already registerd",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return res.status(201).json({
        message: "User is created successfully",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      message: "User is not registered",
    });
  }

  if (existingUser.authenticate(password)) {
    const token = jwt.sign(
      existingUser.toObject(),
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600 * 24 * 7, // 7 days
      }
    );
    existingUser = [{ ...existingUser.toObject(), password: password }];
    return res.status(200).json({
      message: "Login Successfully",
      user: existingUser,
      token,
    });
  }

  return res.status(401).json({
    message: "Incorrect password",
  });
};

export const update = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  // !existingUser.authenticate(password) Question M
  // done it by id ?
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  existingUser.firstName = firstName || existingUser.firstName;
  existingUser.lastName = lastName || existingUser.lastName;
  existingUser.email = email || existingUser.email;
  existingUser.password = password || existingUser.password;

  const updateUser = await existingUser.save();

  if (updateUser) {
    return res.status(200).json({
      message: "User is updated succesfully",
    });
  } else {
    return res.status(400).json({
      message: "User is not saved successfully",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    if (Users) {
      return res.status(200).json({
        message: "All MiniMindHub Users",
        Users,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error,
    });
  }
};
