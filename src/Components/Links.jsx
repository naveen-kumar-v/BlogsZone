"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { handleSignOut } from "@/utils/action";

const Links = ({session}) => {

    const [open, setOpen] = useState(false);
    const pathName = usePathname();
  
    const Links = [
      {
        title: "Homepage",
        path: "/",
      },
      {
        title: "About",
        path: "/about",
      },
      {
        title: "Contact",
        path: "/contact",
      },
      {
        title: "Blogs",
        path: "/blogs",
      },
      {
        title : "Add",
        path : "/serveractiontest"
      }
    ];

  return (
    <>
      <nav className="md:flex gap-4 hidden">
        {Links.map((link) => {
          return (
            <Link
              key={link.title}
              href={link.path}
              className={`transition-all ${
                pathName === link.path
                  ? "bg-white text-gray-950 font-semibold"
                  : "bg-transparent hover:bg-[var(--bgSoft)] text-white font-medium"
              } px-4 py-1 rounded-3xl `}
            >
              {link.title}
            </Link>
          );
        })}
        {session ? (
          <>
            {session?.isAdmin && 
            <button className="hidden md:block bg-white text-gray-950 rounded font-semibold px-4 py-1">
                <Link>Admin</Link> 
            </button> }
            <form action={handleSignOut}> 
                <button className="hidden md:block bg-white text-gray-950 rounded font-semibold px-4 py-1">
                Logout 
                </button> 
            </form>
          </>
            ) : 
            <Link href={"/login"}>
                <button className="hidden md:block bg-white text-gray-950 rounded font-semibold px-4 py-1"> Login </button>
            </Link>
        }
      </nav>

    {/* Navbar for the small screen */}
      {/* <button
        className="block md:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X color="#ffffff" /> : <AlignJustify color="#ffffff" />}
      </button>

      <nav
        className={`flex gap-4 w-[12rem] px-4 py-8 bg-[rgba(13,12,34,0.7)] z-10 backdrop-blur-md md:hidden flex-col justify-start items-center absolute right-0 top-[63px] h-[calc(100vh-120px)] transition-all  ${
          !open && "hidden"
        }`}
      >
          {Links.map((link) => {
            return (
              <Link
                key={link.title}
                href={link.path}
                className={`transition-all ${
                  pathName === link.path
                    ? "bg-white  text-gray-950 font-semibold"
                    : "bg-transparent hover:bg-[var(--bgSoft)] text-white font-medium"
                }  px-4 py-1 rounded w-full text-center`}
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            );
          })}
          <div className="w-full border-t-2 border-gray-500 pt-6">
          {session ? (
            <>
              {session?.isAdmin && 
              <button className="bg-white text-gray-950 rounded font-semibold px-4 py-1 w-full">
                  <Link>Admin</Link> 
              </button> }
              <form action={handleSignOut}> 
                  <button className="bg-white text-gray-950 rounded font-semibold px-4 py-1 w-full">
                  Logout 
                  </button> 
              </form>
            </>
            ) : 
            <Link href={"/login"}>
              <button className=" bg-white text-gray-950 rounded font-semibold px-4 py-1 w-[10rem] "> Login </button>
            </Link>
          }
          </div>
      </nav> */}
    </>
  )
}

export default Links