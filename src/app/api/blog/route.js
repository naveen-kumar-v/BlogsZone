import Post from "@/models/postModel";
import { dbConnect } from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async(request) => {
    try{
        dbConnect();
        const blogs = await Post.find();
        revalidatePath("/blogs");
        return NextResponse.json(blogs);
    } catch (err){
        console.log(err);
        return NextResponse.error(err);
    }
}