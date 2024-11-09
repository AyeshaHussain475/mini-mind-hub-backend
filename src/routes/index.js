import express from "express";
import {
  deleteUser,
  getUsers,
  signin,
  signup,
  update,
} from "../controller/auth.js";
import animalRouter from "./animal.js";
import quizRouter from "./quiz.js";
import mediaRouter from "./media.js";

import authenticate from "../middlewares/authenticate.js";
import instrumentRouter from "./instrument.js";
import { createPoem } from "../controller/poems.js";
import poemsRouter from "./poems.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/edit", update);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.use("/animal", authenticate, animalRouter);
router.use("/quiz", authenticate, quizRouter);
router.use("/instrument", authenticate, instrumentRouter);

// no need to authenticate media route
router.use("/media", mediaRouter);

router.use("/poems", poemsRouter);

export default router;
