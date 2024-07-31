import { getAuthor } from "@/utils/postsData";
import Image from "next/image";
import Link from "next/link";

const PostCard = async ({ blog }) => {
  const author = await getAuthor(blog.userId);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-[100%]">
        <Image
          src={blog.img}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw"
          className="object-cover"
        />
      </div>

      <div className="relative py-4 max-w-[90%]">
        <h2 className="text-lg md:text-xl font-semibold">{blog.title}</h2>
        <p className=" text-[13px] pb-2 font-medium text-gray-500">
          {author?.username}, {formatDate(blog?.date)}
        </p>
        <p className="line-clamp-3">{blog.desc}</p>
        <div className="flex justify-between items-center pt-1">
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-blue-600 font-medium underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
