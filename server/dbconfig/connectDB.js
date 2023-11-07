import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "alemeno",
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

export default connectDB;