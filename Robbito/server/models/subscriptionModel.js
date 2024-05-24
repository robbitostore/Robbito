import mongoose from "mongoose";

const subscriptionModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("subscription", subscriptionModel);
