import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "Student" | "Lecturer" | "Admin";
  name: string;
  profilePicture: string;
  wallet: number;
  pavePoints: number;
  modules: mongoose.Schema.Types.ObjectId[];
  lastLogin: Date;
  consecutiveLogins: number;
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
  lastLogin: { type: Date, default: Date.now },
  consecutiveLogins: { type: Number, default: 1 },
});

//This is a change stream pipeline that will only trigger when the `wallet` field is updated
//This pipeline will be used in the `User` model's `watch()` function
//It's to help us rank the users by their wallet balance in real-time
export const walletChangePipeline = [
  {
    $match: {
      "updateDescription.updatedFields.wallet": { $exists: true },
    },
  },
  // {
  //   $project: {
  //     documentKey: false,
  //     updateDescription: false,
  //   },
  // },
];
export default mongoose.model<IUser>("User", UserSchema);
