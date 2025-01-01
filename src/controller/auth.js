import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

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

      if (!existingUser.isVerified) {
        return res
          .status(403)
          .json({ message: "Please verify your email before logging in" });
      }

      return res.status(200).json({
        message: "Login Successfully",
        user: existingUser,
        token,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      err,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName)
      return res.status(400).json({ message: "Name field cannot be empty" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "User is not saved successfully",
      });
    }
    return res.status(200).json({
      message: "User is updated succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const token = jwt.sign({ user: existingUser }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600 * 24 * 7, // 7 days
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${existingUser._id}/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f9fa;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border: 1px solid #dddddd;
              border-radius: 8px;
              overflow: hidden;
            }
            .email-header {
              background-color: #007bff;
              color: white;
              text-align: center;
              padding: 20px;
            }
            .email-header img {
              max-width: 100px;
              margin-bottom: 10px;
            }
            .email-header h1 {
              margin: 0;
              font-size: 24px;
            }
            .email-body {
              padding: 20px;
              line-height: 1.6;
              color: #333333;
            }
            .email-body a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            .email-footer {
              background-color: #f1f1f1;
              color: #666666;
              text-align: center;
              font-size: 12px;
              padding: 15px;
            }
            .email-footer a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
        <div class="email-container" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <div class="email-header" style="text-align: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px;">
            <img src="https://via.placeholder.com/100x50?text=Logo" alt="MiniMindHub Logo" style="margin-bottom: 10px;">
            <h1 style="color: #333;">Reset Your Password</h1>
          </div>
          <div class="email-body" style="padding: 20px;">
            <p style="color: #555;">Hi ${existingUser.firstName},</p>
            <p style="color: #555;">We received a request to reset your password for your MiniMindHub account. You can reset your password by clicking the button below:</p>
            <p style="text-align: center; margin: 20px 0;">
              <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </p>
            <p style="color: #555;">If you didn’t request a password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>
          <div class="email-footer" style="border-top: 1px solid #e0e0e0; padding-top: 15px; text-align: center; color: #777;">
            <p>Need help? Contact our <a href="mailto:support@minimindhub.com" style="color: #007bff;">support team</a>.</p>
            <p>&copy; ${new Date().getFullYear()} MiniMindHub. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email", error });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Password reset email sent!" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messgae: "Internal Servor error",
      error,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id, token, password } = req.body;

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userExists = await User.findOne({ email: decodedUser?.user?.email });

    if (!userExists) {
      throw new Error("User not found. Please try again!");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (updatedUser) return res.json("Password updated successfully!");

    return res
      .status(400)
      .json({ error: "Failed to update password. Please try again!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      messgae: "Internal Servor error",
      error,
    });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const token = jwt.sign(newUser.toObject(), process.env.JWT_SECRET_KEY, {
      expiresIn: 3600 * 24 * 7, // 7 days
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-account?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to MiniMindHub - Verify Your Email",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f9fa;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border: 1px solid #dddddd;
              border-radius: 8px;
              overflow: hidden;
            }
            .email-header {
              background-color: #007bff;
              color: white;
              text-align: center;
              padding: 20px;
            }
            .email-header img {
              max-width: 100px;
              margin-bottom: 10px;
            }
            .email-header h1 {
              margin: 0;
              font-size: 24px;
            }
            .email-body {
              padding: 20px;
              line-height: 1.6;
              color: #333333;
            }
            .email-body a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
            .email-footer {
              background-color: #f1f1f1;
              color: #666666;
              text-align: center;
              font-size: 12px;
              padding: 15px;
            }
            .email-footer a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <img src="https://via.placeholder.com/100x50?text=Logo" alt="MiniMindHub Logo">
              <h1>Welcome to MiniMindHub!</h1>
            </div>
            <div class="email-body">
              <p>Hi ${firstName},</p>
              <p>Thank you for joining MiniMindHub! To complete your registration, please verify your email address by clicking the button below:</p>
              <p><a href="${verificationLink}" target="_blank">Verify Email</a></p>
              <p>If you didn’t create an account with MiniMindHub, please ignore this email.</p>
            </div>
            <div class="email-footer">
              <p>Need help? Contact our <a href="mailto:support@minimindhub.com">support team</a>.</p>
              <p>&copy; ${new Date().getFullYear()} MiniMindHub. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error sending verification email", error });
      }
    });

    return res.status(200).json({
      message: "Account successfully created. Verify your email.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      err,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { token } = req.query;
  try {
    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user and mark as verified
    const user = await User.findOneAndUpdate(
      { email: decodedUser.email },
      { isVerified: true },
      { new: true }
    );
    if (!user) {
      return res.status(400).send("Invalid token or user not found.");
    }

    return res.json({
      message: "Email verified successfully! You can now log in.",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token", err });
  }
};
