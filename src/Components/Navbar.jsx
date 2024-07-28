"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
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
  ];

  const isSession = true;

  return (
    <div className="w-full py-4 flex justify-between items-center relative ">
      <Link href={"/"} className="text-xl font-bold ">Logo</Link>

      <nav className="md:flex gap-4 hidden">
        <>
          {Links.map((link) => {
            return (
              <Link
                key={link.title}
                href={link.path}
                className={`transition-all ${
                  pathName === link.path
                    ? "bg-white hover:bg-slate-50 text-gray-950 font-semibold"
                    : "bg-transparent text-white font-medium"
                } px-4 py-1 rounded-3xl hover:bg-[rgba(73,73,73,0.3)]`}
              >
                {link.title}
              </Link>
            );
          })}
        </>
      </nav>

      <button className="hidden md:block bg-white text-gray-950 rounded font-semibold px-4 py-1">
        {isSession ? "Logout" : "Login"}
      </button>

      <button
        className="block md:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X color="#ffffff" /> : <AlignJustify color="#ffffff" />}
      </button>

      <nav
        className={`flex gap-6 p-14 bg-[var(--bg)] z-10 backdrop-blur-sm md:hidden flex-col justify-start items-center absolute right-0 top-[63px] h-[calc(100vh-120px)] transition-all  ${
          !open && "hidden"
        }`}
      >
        <>
          {Links.map((link) => {
            return (
              <Link
                key={link.title}
                href={link.path}
                className={`transition-all ${
                  pathName === link.path
                    ? "bg-white hover:bg-slate-50 text-gray-950 font-semibold"
                    : "bg-transparent text-white font-medium"
                }  px-4 py-1 rounded-2xl w-full text-center`}
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            );
          })}
          <button className="bg-white text-gray-950 rounded w-full font-semibold p-1 mt-auto">
            Login
          </button>
        </>
      </nav>
    </div>
  );
};

export default Navbar;
