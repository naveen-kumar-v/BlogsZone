import { getAuthor } from "@/utils/postsData";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

const AuthorDetails = async ({ id }) => {
  const author = await getAuthor(id);

  return (
    <div className="flex gap-4 items-center">
      <div className="rounded-full overflow-hidden relative w-10 h-10">
        {
          author?.img ? 
          <Image src={author.img} alt="Blog pic" fill className="object-cover" />
          :
          <CircleUserRound size={40} strokeWidth={1.5} absoluteStrokeWidth />
        }
      </div>
      <div>
        <p className="text-gray-400 font-semibold">Published by </p>
        <p>{author?.username || "BlogsZone user"}</p>
      </div>
    </div>
  );
};

export default AuthorDetails;
