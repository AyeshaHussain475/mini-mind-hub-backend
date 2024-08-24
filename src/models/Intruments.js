import mongoose from "mongoose";

const instrumentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String },
    sound: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Instrument", instrumentSchema);
