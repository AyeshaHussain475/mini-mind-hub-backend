import mongoose, { Schema } from "mongoose";

const QuizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
    startTime: Date,
    endTime: Date,
    score: Number,
    isPassed: Boolean,
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question" },
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", QuizAttemptSchema);
