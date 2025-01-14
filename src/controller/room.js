import Room from "../models/Room.js";
import User from "../models/User.js";

// Create a room
export const createRoom = async (req, res) => {
  const { name } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newRoom = new Room({ name });
    await newRoom.save();
    return res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ error: "Error creating room" });
  }
};

// Fetch all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Error fetching rooms" });
  }
};
