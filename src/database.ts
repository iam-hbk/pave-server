import mongoose from "mongoose";
import dotenv from "dotenv";
import user, { walletChangePipeline } from "@models/user";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");

    // const walletChangeStream = user.watch(walletChangePipeline);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
export default connectDB;
