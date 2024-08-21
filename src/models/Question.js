import mongoose, { Schema } from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    quizId: { type: Schema.Types.ObjectId },
    questionText: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswer: {
      type: String,
    },
    explanation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", QuestionSchema);
