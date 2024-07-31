import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./dbConnect";
import User from "@/models/userModel";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const login = async(credentials) => {
    try{
        console.log(credentials);
        await dbConnect();

        const user = await User.findOne({email : credentials.email});

        if(!user){
            return {error : "User does not exist!"};
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if(!isPasswordCorrect){
            return { error : "Invalid credentials!"};
        }

        return user;

    } catch(err){
        console.log(err);
        return { error: "Failed to login."};
    }
}

export const {
        handlers : {GET, POST}, 
        auth, 
        signIn, 
        signOut
    } = NextAuth({
    providers :[
        GitHub({
            clientId : process.env.NEXT_GITHUB_ID,
            clientSecret : process.env.NEXT_GITHUB_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try{
                    const user = await login(credentials);
                    console.log(user);
                    NextResponse.redirect("http://localhost:3000/")
                    return user;
                } catch(err){
                    console.log(err);
                    return null;
                }
            }
        })
    ],
    callbacks : {
        async signIn({user, profile, account}) {
            if(account.provider === "github"){
                await dbConnect();
                try{
                    const user = await User.findOne({email : profile.email})
                
                    if(!user){
                        const newUser = new User({
                            username : profile.name,
                            email : profile.email,
                            img : profile.avatar_url,
                        })

                        console.log("New user added : ", newUser);
                        await newUser.save();
                    } else {
                        console.log("Existing user : ", user._doc);
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }
            return true;
        }
    }
})