// "use client"

import AuthorDetails from "@/Components/AuthorDetails";
import AuthorLoader from "@/Components/Loaders.jsx/AuthorLoader";
import { getPost } from "@/utils/postsData";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const MetaData = async ({ params }) => {
  const { slug } = params;
  const blog = await getPost(slug);

  if (!blog) {
    return {
      title: "Blog Not Found - BlogsZone",
      description: "The requested blog could not be found on BlogsZone.",
    };
  }

  return {
    title: blog.title,
    description: blog.desc,
  };
};

const getBlog = async(slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if(!res.ok){
    throw new Error("Something went wrong!");
  }

  return res.json();
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const page = async ({ params }) => {
  const { slug } = params;

  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-center">Blog Not Found</h1>
        <p className="text-xl text-gray-700 text-center">The requested blog could not be found.</p>
        <Link className="bg-[var(--btn)] px-6 py-1 rounded w-fit self-center text-lg font-semibold text-[var(--textSoft)]" href="/blogs">Go Back</Link>
      </div>
    );
  }

  const authorId = blog?.userId;

  return (
    <div className="flex w-full gap-10 h-full flex-col md:flex-row">
      <div className="flex-1 relative h-[40vh] md:h-[calc(100vh-200px)]">
        <Image src={blog?.img} alt="Blog pic" fill className="object-cover" />
      </div>

      <div className="flex-[2_2_0%] flex gap-10 justify-between flex-col h-full">
        <h1 className="font-bold text-2xl md:text-4xl">{blog?.title}</h1>
        <div className="flex gap-12">
          <Suspense fallback={<AuthorLoader />}>
            <AuthorDetails id={authorId} />
          </Suspense>
          <div>
            <p className="text-gray-400 font-semibold">Published date </p>
            <p>{formatDate(blog?.date)}</p>
          </div>
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-semibold pb-2">Description</h1>
          <p className="text-base md:text-lg text-justify">{blog?.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
