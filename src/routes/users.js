import express from "express";
import { getUsers, deleteUser, verifyUser } from "../controller/users.js";

const router = express.Router();

router.get("/", getUsers);
router.patch("/:id", verifyUser);
router.delete("/:id", deleteUser);

export default router;
