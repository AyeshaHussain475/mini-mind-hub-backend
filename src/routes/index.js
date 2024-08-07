import express from "express";
import { signin, signup } from "../controller/auth.js";
import animalRouter from "./animal.js";
import mediaRouter from "./media.js";
import { postQuiz } from "../controller/quiz.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use("/animal", animalRouter);
router.use("/media", mediaRouter);
router.post("/postquiz", postQuiz);

export default router;
