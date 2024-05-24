import mongoose from "mongoose";

const contactModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    messageInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("contact", contactModel);
