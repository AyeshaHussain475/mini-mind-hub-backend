import mongoose from "mongoose";

const animalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "enter animal name"],
      unique: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["mammals", "reptiles", "birds", "fish"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    soundUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Animal", animalSchema);
