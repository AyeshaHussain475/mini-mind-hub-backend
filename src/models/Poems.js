import mongoose from "mongoose";

const PoemsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    vidoe: {
      type: String,
    },
    sound: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Poems", PoemsSchema);
