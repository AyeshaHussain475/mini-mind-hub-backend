import express from "express";
import {
  resetPassword,
  updatePassword,
  signin,
  signup,
  update,
  verifyOtp,
} from "../controller/auth.js";
import animalRouter from "./animal.js";
import quizRouter from "./quiz.js";
import mediaRouter from "./media.js";
import usersRouter from "./users.js";

import authenticate from "../middlewares/authenticate.js";
import instrumentRouter from "./instrument.js";
import { createPoem } from "../controller/poems.js";
import poemsRouter from "./poems.js";
import DeafRouter from "./deaf.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/verify-account", verifyOtp);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);
router.put("/edit", authenticate, update);
router.use("/users", authenticate, usersRouter);
router.use("/animal", authenticate, animalRouter);
router.use("/quiz", authenticate, quizRouter);
router.use("/instrument", authenticate, instrumentRouter);
router.use("/deaf", authenticate, DeafRouter);

// no need to authenticate media route
router.use("/media", mediaRouter);
router.use("/poems", poemsRouter);

export default router;
