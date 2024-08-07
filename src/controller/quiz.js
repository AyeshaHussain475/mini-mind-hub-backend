import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, description, duration, attempts } = req.body;
    const newQuiz = new Quiz({
      title,
      description,
      duration,
      attempts,
    });

    const saveQuiz = await newQuiz.save();

    if (saveQuiz) {
      return res.status(200).json({
        message: "Quiz is created successfully",
      });
    }

    return res.status(400).json({
      message: "Failed to create quiz",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().exec();

    return res.json({ quizzes });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever error",
      error,
    });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json("Quiz does not exists");
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const questions = await Question.find({ quizId }).exec();

    return res.json({ quiz: { ...quiz.toObject(), questions } });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
