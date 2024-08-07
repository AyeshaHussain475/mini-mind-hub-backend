import Question from "../models/Question.js";

export const postQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionText, options, correctAnswer, explanation } = req.body;

    const existingQuestion = await Question.findOne({
      questionText: req.body.questionText,
    }).exec();

    if (existingQuestion) {
      return res.status(400).json({
        message: "Question already exists by this title",
      });
    }

    const newQuestion = new Question({
      questionText,
      quizId,
      options,
      correctAnswer,
      explanation,
    });

    const saveQuestion = await newQuestion.save();

    if (saveQuestion) {
      return res.status(200).json({
        message: "question is uploaded successfully",
      });
    }

    return res.status(400).json({
      message: "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).exec();

    return res.json({ questions });
  } catch (error) {
    return res.status(400).json({
      message: "Internal Server Error",
    });
  }
};
