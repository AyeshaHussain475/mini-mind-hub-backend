import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

export const postQuiz = async (req, res) => {
  try {
    const existingQuiz = await Quiz.findOne({ title: req.body.title }).exec();
    if (existingQuiz) {
      return res.status(400).json({
        message: "Quiz already uploaded",
      });
    }

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
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
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
    return res.json({
      quizzes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Sever error",
      error,
    });
  }
};

export const getQuizQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;

    console.log(quizId);

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json("Quiz does not exists");
    }

    const questions = await Question.find({ quizId }).exec();
    return res.json({
      questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
