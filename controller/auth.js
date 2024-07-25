const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    }).exec();

    if (existingUser) {
      return res.status(400).json({
        message: "User already registerd",
      });
    }

    const { firstName, lastName, email, password } = req.body;
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

exports.signin = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    return res.status(400).json({
      message: "User is not registered",
    });
  }

  if (existingUser.authenticate(req.body.password)) {
    return res.status(200).json({
      message: "Login Successfully",
      user: existingUser,
    });
  } else {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }
};
