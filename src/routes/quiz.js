import express from "express";
import {
  attemptQuiz,
  createQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzes,
  updateQuiz,
} from "../controller/quiz.js";
import { getQuestions, postQuestion } from "../controller/questions.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.delete("/", deleteQuiz);
router.get("/:quizId", getQuiz);
router.post("/:quizId/attempt", attemptQuiz);
router.put("/:quizId", updateQuiz);

router.post("/:quizId/question", postQuestion);
router.get("/:quizId/question", getQuestions);

export default router;
