import mongoose from "mongoose";

const Post = mongoose.models.Post || mongoose.model("Post", new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 50,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  }
}, { timestamps: true }));

export default Post;