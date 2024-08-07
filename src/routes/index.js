import express from "express";
import { signin, signup } from "../controller/auth.js";
import animalRouter from "./animal.js";
import mediaRouter from "./media.js";
import { getQuizQuestions, getQuizzes, postQuiz } from "../controller/quiz.js";
import { getQuestions, postQuestion } from "../controller/questions.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use("/animal", animalRouter);
router.use("/media", mediaRouter);
router.post("/postquiz", postQuiz);
router.get("/getquizzes", getQuizzes);
router.post("/postquestion", postQuestion);
router.get("/getquestions", getQuestions);
router.get("/getquizquestions/:quizId", getQuizQuestions);

export default router;
