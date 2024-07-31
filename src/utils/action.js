"use server"

import ContactForm from "@/models/contactFormModel";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/utils/auth";
import { dbConnect } from "./dbConnect";
import bcrypt from 'bcrypt';

export const createPost = async(formData) => {

    const {title, desc, userId, img} = Object.fromEntries(formData);
    
    const slug = title.toLowerCase().split(" ").join("-");

    try{
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img,
        });

        await newPost.save();
        console.log("Post added to DB.")
        revalidatePath('/blogs')
    } catch (err){
        console.log(err);
    }
}

export const updatePost = async(formData) => {

    const { title, desc, postId, userId, img } = formData;

    const updates = {};
    if (title) {
        updates.title = title;
        updates.slug = title.toLowerCase().split(" ").join("-");
    }
    if (desc) updates.desc = desc;
    if (img) updates.img = img;
    if (userId) updates.userId = userId;

    try{

        const postExists = await Post.findById({_id : postId});

        if(!postExists){
            return {
                message : "The given post does not exist.",
                status : 404 
            }
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, updates, { new: true });

        revalidatePath('/blogs');

        return {
            message : "Blog post updated successfully.",
            status : 200,
            data : updatedPost
        }

    } catch (err){
        console.log(err);
    }
}

export const createUser = async(formData) => {

    const {username, email, password, img} = Object.fromEntries(formData);
    
    const existingUser = await User.findOne({email});

    if(existingUser){
        return {
            message : "User already exists!",
            status : 400
        }
    }
    try{
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User({
            username,
            email,
            password : hashedPassword,
            img
        })

        await newUser.save();

        const data = JSON.parse(JSON.stringify(newUser));
        data.password = null;

        return {
            status : 200,
            message : "User added successfully",
            data : data
        }
        console.log("User added to DB.")
    } catch (err){
        console.log(err);
    }
}

export const deletePost = async(formData) => {

    const {id} = Object.fromEntries(formData);
    
    try{
        await Post.findByIdAndDelete(id);
        console.log("Post deleted from DB.")
        revalidatePath("/blogs");
    } catch (err){
        console.log(err);
    } finally {
        redirect("/blogs");
    }
}

export const getContactForm = async(formData) => {

    const {name, message, email, phoneNumber} = Object.fromEntries(formData);

    try{
        const newContactForm = await ContactForm({
            name, 
            message, 
            email, 
            phoneNumber,
        })
        
        const res = await newContactForm.save();
        
        console.log("Form Submitted : ", res);
    } catch(err){
        throw new Error(err);
    }
}

export const signInWithGithub = async() => {
  await signIn("github");
}

export const handleSignOut = async() => {
  try {
    await signOut(); 
  } catch (err) {
    console.error('Error signing out:', err);
  } finally {
    revalidatePath("/login");
  }
}

export const handleSignUp =  async (formData) => {

    const {username, email, password} = Object.fromEntries(formData);

    await dbConnect();

    const existingUSer = await User.findOne({email});

    if(existingUSer){
        return  { 
            status : 400 , 
            message : "User already exists"
        };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User({
        username,
        email,
        password : hashedPassword,
    })

    await newUser.save();

    const data = JSON.parse(JSON.stringify(newUser));
    data.password = null;

    const res = {
        message : "User created successfully.",
        status : 200,
        data : data
    }
    return res;
}

// export const handleLogin =  async(formData) => {
//     const {email, password} = Object.fromEntries(formData);

//     try{
//         const resp = await signIn("credentials", {email, password,  callbackUrl: '/dashboard'});
//         console.log(resp);
//         return resp;
//     } catch(err){
//         console.log(err);
//         return { error : "Something went wrong!"};
//     }
// }

export const handleLogin =  async(formData) => {
    const {email, password} = Object.fromEntries(formData);

    await dbConnect();

    const user = await User.findOne({email});

    if(!user){
        return {
            status : 404,
            message : "User does not exist."
        }
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword){
        return {
            status : 404,
            message : "Incorrect password."
        }
    }

    const data = JSON.parse(JSON.stringify(user));
    data.password = null;
    
    return {
        status : 200,
        message : "Login successful",
        data : data,
    }
}