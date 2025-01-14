import Message from "../models/Message.js";
import User from "../models/User.js";

// Fetch messages for a specific room
export const getMessagesForRoom = async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .populate("sender", "username")
      .exec();
    return res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Fetch messages between two users
export const getMessagesBetweenUsers = async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    })
      .sort({ timestamp: 1 })
      .populate("senderId", "name avatar")
      .populate("receiverId", "name avatar");

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Failed to fetch messages." });
  }
};

// Save a message
export const saveMessage = async (req, res) => {
  const { roomId, content, sender } = req.body;

  const newMessage = new Message({
    roomId,
    content,
    sender,
  });

  try {
    await newMessage.save();
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ error: "Failed to save message" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = new User({ username });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};
