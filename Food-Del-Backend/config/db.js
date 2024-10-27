import mongoose from "mongoose";
import 'dotenv/config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ACCESS);
        console.log("DB connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};
