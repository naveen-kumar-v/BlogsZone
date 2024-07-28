"use server"

import ContactForm from "@/models/contactFormModel";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async(formData) => {

    const {title, slug, desc, userId} = Object.fromEntries(formData);
    
    try{
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        });

        await newPost.save();
        console.log("Post added to DB.")
        revalidatePath('/blogs')
    } catch (err){
        console.log(err);
    }
}

export const createUser = async(formData) => {

    const {username, email, password} = Object.fromEntries(formData);
    
    try{
        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();
        // return 
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
        
        await newContactForm.save();
        console.log("Form Submitted");
    } catch(err){
        throw new Error(err);
    }
}