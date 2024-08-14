import express from "express";
import { signin, signup } from "../controller/auth.js";
import animalRouter from "./animal.js";
import mediaRouter from "./media.js";
import {
  getQuiz,
  getQuizzes,
  createQuiz,
  attemptQuiz,
  updateQuiz,
} from "../controller/quiz.js";
import { getQuestions, postQuestion } from "../controller/questions.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use("/animal", authenticate, animalRouter);

// no need to authenticate media route
router.use("/media", mediaRouter);

// separate route
router.post("/quiz", authenticate, createQuiz);
router.get("/quiz", authenticate, getQuizzes);
router.get("/quiz/:quizId", authenticate, getQuiz);
router.post("/quiz/:quizId/attempt", authenticate, attemptQuiz);
router.put("/quiz/:quizId", updateQuiz);

router.post("/quiz/:quizId/question", authenticate, postQuestion);
router.get("/quiz/:quizId/question", authenticate, getQuestions);

export default router;
