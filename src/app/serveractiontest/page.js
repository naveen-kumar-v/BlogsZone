"use client"

import { createPost, createUser, deletePost, updatePost } from "@/utils/action"
import toast from "react-hot-toast";

export default function serveractiontest() {

  const handleCreateUserForm = async(formData) => {

    const {username, email, password, img} = Object.fromEntries(formData);
  
    if( (username.trim() || email.trim() || password.trim()) === ""){
      toast.error("Please fill all the fields.")
    }
  
    const resp = await createUser(formData);
    
    if(resp.status === 200){
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
    }
    console.log(resp);
  }
  
  const handleUpdatePostForm = async(formData) => {

    const {title, desc, postId, userId, img} = Object.fromEntries(formData);
    
    const updateData = { postId, userId };
    if (title.trim() !== "") updateData.title = title;
    if (desc.trim() !== "") updateData.desc = desc;
    if (img.trim() !== "") updateData.img = img;
    
    const resp = await updatePost(updateData);

    if(resp.status === 200){
      toast.success(resp.message);
    } else {
      toast.error(resp.message);
    }
  }


  return (
    <div className="flex gap-20 flex-wrap justify-center items-start">
      <form action={createPost} className="flex flex-col gap-5 w-96 text-black">
          <h1 className="text-xl font-semibold w-full text-center text-white">Add blog post</h1>
          <input className="input w-full" type="text" placeholder="Title" name="title"/>
          <input className="input w-full" type="text" placeholder="Description" name="desc"/>
          <input className="input w-full" type="text" placeholder="User Id" name="userId"/>
          <input className="input w-full" type="text" placeholder="Image link" name="img"/>
          <button className="text-black px-4 py-1 rounded bg-white font-semibold">Add post</button>
      </form>

      <form action={handleUpdatePostForm} className="flex flex-col gap-5 w-96 text-black">
          <h1 className="text-xl font-semibold w-full text-center text-white">Update blog post</h1>
          <input className="input w-full" type="text" placeholder="Title" name="title"/>
          <input className="input w-full" type="text" placeholder="Description" name="desc"/>
          <input className="input w-full" type="text" placeholder="post Id" name="postId"/>
          <input className="input w-full" type="text" placeholder="User Id" name="userId"/>
          <input className="input w-full" type="text" placeholder="Image link" name="img"/>
          <button className="text-black px-4 py-1 rounded bg-white font-semibold">Update post</button>
      </form>

      <form action={handleCreateUserForm} className="flex flex-col gap-5 w-96 text-black">
        <h1 className="text-xl font-semibold w-full text-center text-white">Add User</h1>
        <input className="input w-full" type="text" placeholder="Name" name="username"/>
        <input className="input w-full" type="text" placeholder="Email" name="email"/>
        <input className="input w-full" type="text" placeholder="Password" name="password"/>
        <input className="input w-full" type="text" placeholder="Image link" name="img"/>
        <button className=" px-4 py-1 rounded text-white font-semibold bg-[var(--btn)]">Add user</button>
      </form>

      <form action={deletePost} className="flex flex-col gap-5 w-96 text-black">
        <h1 className="text-xl font-semibold w-full text-center text-white">Delete a Post</h1>
          <input className="input w-full" type="text" placeholder="Post id" name="id"/>
          <button className="px-4 py-1 rounded bg-red-500 text-white font-semibold">Delete post</button>
      </form>
    </div>
  )
}
