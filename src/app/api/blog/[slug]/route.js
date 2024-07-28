import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export const GET = async(request, {params}) => {
    try{
        const {slug} = params;
        const blog = await Post.findOne({slug});
        return NextResponse.json(blog);
    } catch (err){
        console.log(err);
        return NextResponse.error(err);
    }
}