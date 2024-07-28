import Image from "next/image";

export const metadata = {
  title: "About",
  description: "Learn more about BlogsZone, your premier destination for diverse and high-quality blog content. Discover our mission, the team behind the scenes, and our commitment to delivering insightful articles across various topics.",
};

const page = () => {
  return <div className="flex gap-20 w-full ">
    <div className="flex-1 flex gap-8 md:gap-10 flex-col">
      <p className="text-blue-500 font-semibold text-xl">About Agency</p>
      <h1 className="text-[2.25rem] md:text-[3rem] font-bold leading-[50px] md:leading-[60px]">We create digital ideas that are bigger, bolder, braver and better.</h1>
      <p className="text-justify md:text-lg">We create digital ideas that are bigger, bolder, braver and better. We believe in good ideas, flexibility and precision. We are World`s best consulting and finance provider with wide range of web and software development services. </p>

      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-blue-500 font-bold text-xl md:text-2xl">10 K+</h1>
          <p className="text-sm md:text-base">Years of experience</p>
        </div>

        <div>
          <h1 className="text-blue-500 font-bold text-xl md:text-2xl">234 K+</h1>
          <p className="text-sm md:text-base">People reached</p>
        </div>

        <div>
          <h1 className="text-blue-500 font-bold text-xl md:text-2xl">5 K+</h1>
          <p className="text-sm md:text-base">Services and plugins</p>
        </div>
      </div>
    </div>
    <div className="flex-1 relative hidden lg:flex">
      <Image src="/about.png" alt="About image" fill className="object-contain" />
    </div>
  </div>;
};

export default page;
