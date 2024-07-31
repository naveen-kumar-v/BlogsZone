"use client"
import { handleLogin, signInWithGithub } from "@/utils/action";
import { Eye, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {

  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();

  const handleLoginForm = async(formData) => {
    const {email, password} = Object.fromEntries(formData);

    if((email.trim() || password.trim()) === ""){
      toast.error("Please enter the values!");
      return false;
    }

    const response = await handleLogin(formData);


    if(response.status === 200) {
      toast.success(response.message)
      router.push('/blogs');
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      <h1 className="w-full text-center text-xl font-semibold">Login</h1>
      <form action={handleLoginForm} className=" w-full flex flex-col gap-4">
          <div className="w-full flex gap-4 justify-end items-center">
              <label htmlFor="email" className="font-medium w-24 md:w-32 ">Email</label>
              <input type="mail" id="email" placeholder="abc@xyz.com" name="email" className="input w-full"/>
          </div>
          <div className="w-full flex gap-4 justify-end items-center relative">
              <label htmlFor="password" className="font-medium w-24 md:w-32">Password</label>
              <input type={hidePassword ? "password" : "text"} id="password" name="password" placeholder="Enter password" className="input w-full"/>
              <button type="button" className="absolute right-2 top-2.5" onClick={() => setHidePassword(!hidePassword)}>
              {
                  hidePassword ? 
                  <Eye size={20} color="#e5e5e5"/> : <EyeOffIcon size={20} color="#e5e5e5"/>
              }
              </button>
          </div>

          <button type="submit" className="bg-[var(--btn)] font-semibold py-1.5 rounded mt-2">Login</button>
          <div className="flex justify-between items-center w-full text-sm font-medium flex-col md:flex-row gap-2">
              <Link href={"/forgot-password"} className="text-blue-500 hover:underline transition-all font-bold">Forgot Password?</Link>
              <p>Don't have an account? <Link href={"/signup"} className="text-blue-500 hover:underline transition-all font-bold">Sign Up</Link> </p>
          </div>
      </form>

      <div className="flex w-full items-center gap-2">
          <p className="h-[0.25px] flex-1 bg-gray-500"></p>
          <p className="text-gray-500 font-medium">or</p>
          <p className="h-[0.25px] flex-1 bg-gray-500"></p>
      </div>

      <form action={signInWithGithub} className="flex gap-2 justify-center items-center border-[1px] border-gray-600 rounded w-full py-2 transition-all hover:bg-gray-950 active:bg-gray-900">
          <Image src={"/github.png"} width={24} height={24} alt="github"/>
          <button className="font-medium">Login with Github</button>
      </form>
    </>
  )
}

export default Login