import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import QuizAttempt from "../models/QuizAttempt.js";

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
    const quizzes = await Quiz.find();
    const quizzesWithAttempts = [...quizzes];

    for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i];
      const quizAttempts = await QuizAttempt.find({
        quizId: quiz._id,
        userId: req.user._id,
      });
      quizzesWithAttempts[i] = {
        ...quiz.toObject(),
        attemptsRemaining: quiz.attempts - quizAttempts.length,
      };
    }

    return res.json({ quizzes: quizzesWithAttempts });
  } catch (error) {
    console.error(error);
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

export const attemptQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId, answers } = req.body;

    let score = 0;

    for (let i = 0; i < answers.length; i++) {
      const question = await Question.findById(answers[i].questionId);
      if (question.correctAnswer === answers[i].answer) {
        score += 1;
      }
    }

    const passingScore = answers.length;
    const isPassed = score >= passingScore;

    const newAttempt = new QuizAttempt({
      quizId,
      userId,
      answers,
      score,
      isPassed,
    });

    const saveAttempt = newAttempt.save();

    if (saveAttempt) {
      return res.status(200).json({
        message: "Quiz is saved successfully",
        attempt: saveAttempt,
      });
    }
    return res.status(400).json({
      message: "Unable to save the quiz",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateQuiz = async (req, res) => {
  const {
    title,
    description,
    duration,
    attempts,
    newQuestions,
    deletedQuestionIds,
  } = req.body;
  const { quizId } = req.params;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description, duration, attempts },
      { new: true, session }
    );

    if (!updatedQuiz) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    if (deletedQuestionIds && deletedQuestionIds.length > 0) {
      await Question.deleteMany(
        { _id: { $in: deletedQuestionIds } },
        { session }
      );
    }

    if (newQuestions && newQuestions.length > 0) {
      const isValidQuestionSchema = ({
        quizId,
        questionText,
        options,
        correctAnswer,
      }) => quizId && questionText && correctAnswer && Array.isArray(options);

      for (let i = 0; i < newQuestions.length; i++) {
        if (!isValidQuestionSchema(newQuestions[i])) {
          await session.abortTransaction();
          return res.status(400).json({
            message: `Invalid question schema at index ${i}`,
            error: "Validation failed",
          });
        }
      }

      await Question.insertMany(newQuestions, { session });
    }
    await session.commitTransaction();
    return res.status(200).json(updatedQuiz);
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  } finally {
    session.endSession();
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    const deleteQuiz = await Quiz.findOneAndDelete({ title });
    if (!deleteQuiz) {
      return res.status(400).json({ message: "Something went wrong!" });
    } else {
      return res.status(200).json({ message: "Quiz is deleted successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!", error });
  }
};
