import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-20 w-full h-[calc(100vh-200px)]">
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="font-bold text-[64px] md:text-[80px] leading-[84px]">Creative Thoughts Agency</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt neque excepturi doloribus repellendus ipsa quibusdam </p>
        <div className="flex gap-4 font-semibold">
          <button className="rounded p-2 px-4 bg-[var(--btn)]"><Link href={"/about"}>Learn More</Link></button>
          <button className="rounded p-2 px-4 bg-white text-gray-950"><Link href={"/contact"}>Contact</Link></button>
        </div>
        <Image src="/brands.png" alt="hero" width={400} height={100} className="grayscale" />
      </div>
      <div className="flex-1 relative hidden lg:flex">
        <Image src="/hero.gif" alt="Hero image" fill className="object-contain" />
      </div>
    </div>
  );
}
