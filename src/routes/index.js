import express from "express";
import { signin, signup } from "../controller/auth.js";
import animalRouter from "./animal.js";
import mediaRouter from "./media.js";
import {
  getQuiz,
  getQuizzes,
  createQuiz,
  attemptQuiz,
} from "../controller/quiz.js";
import { getQuestions, postQuestion } from "../controller/questions.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use("/animal", animalRouter);
router.use("/media", mediaRouter);

// separate route
router.post("/quiz", createQuiz);
router.get("/quiz", getQuizzes);
router.get("/quiz/:quizId", getQuiz);
router.post("/quiz/:quizId/attempt", attemptQuiz);

router.post("/quiz/:quizId/question", postQuestion);
router.get("/quiz/:quizId/question", getQuestions);

export default router;
