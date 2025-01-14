import express from "express";
import multer from "multer";
import {
  createUser,
  getMessagesForRoom,
  getMessagesBetweenUsers,
  saveMessage,
  getAllUsers,
} from "../controller/message.js";

const MessgaeRouter = express.Router();

// Routes for messages
MessgaeRouter.get("/messages/:roomId", getMessagesForRoom);
MessgaeRouter.get("/messages/:userId/:otherUserId", getMessagesBetweenUsers);
MessgaeRouter.post("/messages", saveMessage);

// Routes for users
MessgaeRouter.post("/users", createUser);
MessgaeRouter.get("/users", getAllUsers);

export default MessgaeRouter;
