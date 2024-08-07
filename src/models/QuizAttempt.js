import mongoose, { Schema } from "mongoose";

const QuizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
    Score: String,
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", QuizAttemptSchema);
