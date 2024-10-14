// using this file to create logic and connect with the DB
import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ankit:anku12345@cluster0.c8laa.mongodb.net/food-del").then(()=>console.log("DB Connected"));
}