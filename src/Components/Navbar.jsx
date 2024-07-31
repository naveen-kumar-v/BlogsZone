import Link from "next/link";
import Links from "./Links";
import { auth } from "@/utils/auth";

const Navbar = async () => {

  const session = await auth();
  
  return (
    <div className="w-full py-4 flex justify-between items-center relative ">
      <Link href={"/"} className="text-xl font-bold ">BlogsZone</Link>

      <Links session={session?.user}/>
    </div>
  );
};

export default Navbar;
