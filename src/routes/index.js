import express from "express";
import { signin, signup, update } from "../controller/auth.js";
import animalRouter from "./animal.js";
import quizRouter from "./quiz.js";
import mediaRouter from "./media.js";

import authenticate from "../middlewares/authenticate.js";
import instrumentRouter from "./instrument.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/edit", update);
router.use("/animal", authenticate, animalRouter);
router.use("/quiz", authenticate, quizRouter);
router.use("/instrument", instrumentRouter);

// no need to authenticate media route
router.use("/media", mediaRouter);

export default router;
