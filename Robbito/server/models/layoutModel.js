import mongoose from "mongoose";

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

// Banner Schema
const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

// Footer Schema
const footerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  telephone: {
    type: String,
  },
});

const layoutSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    logo: {
      logoImage: {
        type: String,
      },
      title: {
        type: String,
      },
    },
    faq: [faqSchema],
    banner: [bannerSchema],
    footer: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
      },
      telephone: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Layout", layoutSchema);
