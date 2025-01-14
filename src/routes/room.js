import express from "express";
import { createRoom, getAllRooms } from "../controller/room.js"; // Import the controller functions

const RoomRouter = express.Router();

// Route to create a new room
RoomRouter.post("/create-room/:username", createRoom);

// Route to fetch all rooms
RoomRouter.get("/", getAllRooms);

export default RoomRouter;
