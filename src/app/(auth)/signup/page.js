import { handleSignOut, signInWithGithub } from "@/utils/action";
import { auth } from "@/utils/auth";
import Signup from "@/Components/SignUp";

const page = () => {

  return (
    <div className="p-6 w-[24rem] md:w-[33rem] rounded-md flex flex-col bg-[rgba(0,0,0,0.15)] gap-6 justify-start items-center md:justify-center flex-1 md:flex-none">
      <Signup/>
    </div>
  )
}

export default page;