"use server"

import mongoose from "mongoose";

let isConnected = false; // To keep track of the connection status
let dbInstance = null;   // To store the db instance

export const dbConnect = async () => {
  if (isConnected && dbInstance) {
    return dbInstance;
  }

  const url = process.env.NEXT_PUBLIC_MONGO_DB_URL;

  try {
    dbInstance = await mongoose.connect(url);
    isConnected = true;
    console.log("db connected");
    return dbInstance;
  }
  catch (err) {
    console.log("connection error : ", err.message);
  }
}
