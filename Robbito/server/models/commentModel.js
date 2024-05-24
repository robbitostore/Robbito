import mongoose from "mongoose";

const commentModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    stars: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentModel);
