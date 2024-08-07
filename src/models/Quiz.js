import mongoose, { Schema } from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    attempts: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", QuizSchema);
