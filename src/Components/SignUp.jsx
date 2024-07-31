"use client"
import { handleSignUp, signInWithGithub } from "@/utils/action";
import { Eye, EyeOffIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


const SignUp = () => {

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleForm = async(formData) => {
    const {username, email, password, confirmPassword} = Object.fromEntries(formData);

    if( (username.trim() || email.trim() || password.trim() || confirmPassword.trim()) === ""){
      toast.error("Please enter the values!");
      return false;
    }

    if(password !== confirmPassword){
      toast.error("Passwords not matching!")
      return false;
    }

    const response = await handleSignUp(formData);

    console.log(response);
    
    if(response.status === 200) {
      toast.success(response.message)
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
    <h1 className="w-full text-center text-xl font-semibold">Sign Up</h1>
    <form action={handleForm} className=" w-full flex flex-col gap-4">
        <div className="w-full flex gap-4 justify-end items-center">
            <label htmlFor="username" className="font-medium w-28 md:w-64 ">Name</label>
            <input type="username" id="username" placeholder="Bhupendra Jogi" name="username" className="input w-full"/>
        </div>
        <div className="w-full flex gap-4 justify-end items-center">
            <label htmlFor="email" className="font-medium w-28 md:w-64  ">Email</label>
            <input type="email" id="email" placeholder="abc@xyz.com" name="email" className="input w-full"/>
        </div>
        <div className="w-full flex gap-4 justify-end items-center relative">
            <label htmlFor="password" className="font-medium w-28 md:w-64 ">Password</label>
            <input type={hidePassword ? "password" : "text"} id="password" name="password" placeholder="Enter password" className="input w-full"/>
            <button type="button" className="absolute right-2 top-2.5" onClick={() => setHidePassword(!hidePassword)}>
              {
                hidePassword ? 
                <Eye size={20} color="#e5e5e5"/> : <EyeOffIcon size={20} color="#e5e5e5"/>
              }
            </button>
        </div>

        <div className="w-full flex gap-4 justify-end items-center relative">
            <label htmlFor="confirmPassword" className="font-medium leading-5 w-28 md:w-64 ">Confirm Password</label>
            <input type={hideConfirmPassword ? "password" : "text"}  id="confirmPassword" name="confirmPassword" placeholder="Confirm password" className="input w-full"/>
            <button type="button" className="absolute right-2 top-2.5 " onClick={() => setHideConfirmPassword(!hideConfirmPassword)}>
              {
                hideConfirmPassword ? 
                <Eye size={20} color="#e5e5e5" /> : <EyeOffIcon size={20} color="#e5e5e5"/>
              }
            </button>
        </div>

        <button type="submit" className="bg-[var(--btn)] font-semibold py-2 rounded mt-2">Sign Up</button>

        <div className="flex items-center w-full text-sm font-medium">
            <p>Already have an account? <Link href={"/login"} className="text-blue-600 hover:underline transition-all font-bold">Login</Link> </p>
        </div>
    </form>

    <div className="flex w-full items-center gap-2">
        <p className="h-[0.25px] flex-1 bg-gray-500"></p>
        <p className="text-gray-500 font-medium">or</p>
        <p className="h-[0.25px] flex-1 bg-gray-500"></p>
    </div>

    <form action={signInWithGithub} className="flex gap-2 justify-center items-center border-[1px] border-gray-600 rounded w-full py-2.5 transition-all hover:bg-gray-950 active:bg-gray-900">
        <Image src={"/github.png"} width={24} height={24} alt="github"/>
        <button className="font-medium">Sign up with Github</button>
    </form>
</>
  )
}

export default SignUp