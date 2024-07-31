import PostCard from '@/Components/PostCard'

export const metadata = {
  title: "Blogs",
  description: "Discover a diverse range of insightful and engaging blog posts on BlogsZone. Explore topics from technology to lifestyle, written by expert bloggers. Stay informed, entertained, and inspired with our regularly updated content.",
};

const url = process.env.NEXT_PUBLIC_BASE_URL;

const getBlogs = async() => {
  const res = await fetch(`${url}/api/blog`, {cache: 'no-store'});

  if(!res.ok){
    throw new Error("Something went wrong!");
  }

  return res.json();
};

const page = async () => {

  const blogPosts = await getBlogs();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-16 gap-y-10 w-full'>
      {
        blogPosts?.map(blog => {
          return <PostCard blog={blog} key={blog._id} />
        })
      }
    </div>
  )
}

export default page