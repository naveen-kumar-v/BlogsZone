import { dbConnect } from "./dbConnect";
import Post from "@/models/postModel";
import User from "@/models/userModel";

//fetch all posts
export const getPosts = async () => {
  try {
    await dbConnect();
    const posts = await Post.find({});
    return posts;
  }
  catch (err) {
    console.log("Failed to fetch posts! ", err)
  }
}


//get a single post
export const getPost = async (slug) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug });
    return post;
  }
  catch (err) {
    console.log("Failed to fetch post. ", err)
  }
}

//get author data
export const getAuthor = async (id) => {
  try {
    await dbConnect();
    const user = await User.findById(id);
    return user;
  }
  catch (err) {
    console.log("Failed to fetch user. ", err)
  }
}

//get all author data
export const getUsers = async (id) => {
  try {
    await dbConnect();
    const user = await User.find();
    return user;
  }
  catch (err) {
    console.log("Failed to fetch users. ", err)
  }
}