import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "Student" | "Lecturer" | "Admin";
  name: string;
  profilePicture: string;
  wallet: number;
  modules: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Student", "Lecturer", "Admin"],
    required: true,
  },
  name: { type: String, required: true },
  profilePicture: { type: String },
  wallet: { type: Number, default: 0 },
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
