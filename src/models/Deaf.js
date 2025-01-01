import mongoose from "mongoose";

const DeafSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    video: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Deaf", DeafSchema);
