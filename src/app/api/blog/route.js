import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export const GET = async(request) => {
    try{
        const blogs = await Post.find();
        return NextResponse.json(blogs);
    } catch (err){
        console.log(err);
        return NextResponse.error(err);
    }
}