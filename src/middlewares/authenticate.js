import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userExists = await User.findOne({ email: decodedUser.email });

    if (!userExists) {
      throw new Error("Failed to authenticate");
    }

    next();
  } catch (err) {
    console.error("Authentication Error: ", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
