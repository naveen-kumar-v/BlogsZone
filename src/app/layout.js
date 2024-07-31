import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/Components/Navbar'
import Footer from "@/Components/Footer";
import { Toaster } from "react-hot-toast";
import { auth } from "@/utils/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default : "BlogsZone",
    template : "BlogsZone - %s"
  },
  description: "Welcome to BlogsZone, your ultimate destination for diverse and engaging blog posts. Explore articles on technology, lifestyle, health, and more, written by expert bloggers. Stay updated and inspired with fresh content daily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center gap-4 md:gap-8 justify-between w-[calc(100vw - 50px)] px-8 md:px-20 lg:px-36">
          <Navbar />
          {children}
          <Footer />
        </main>
        <div><Toaster position="top-right" reverseOrder={false}/></div>
      </body>
    </html>
  );
}
