import mongoose from "mongoose";

export interface JsonUser {
  _id: string;
  email: string;
  role: "Student" | "Lecturer" | "Admin";
  name: string;
  profilePicture?: string; // url
  wallet: number;
  token: string;
  modules: mongoose.Schema.Types.ObjectId[];
  consecutiveLogins: number;
}
