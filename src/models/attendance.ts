import mongoose, { Document, Schema } from "mongoose";

export interface IAttendance extends Document {
  student: mongoose.Schema.Types.ObjectId; // Reference to User model (student)
  session: mongoose.Schema.Types.ObjectId; // Reference to Session model
  scanTime: Date; // The time when the student scanned the QR code
  rewardAmount: number; // Amount of PaveCoins rewarded to the student for this attendance
}

const AttendanceSchema = new Schema<IAttendance>({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  scanTime: { type: Date, default: Date.now },
  rewardAmount: { type: Number, default: 0 },
});

export const newAttendancePipeline = [
  {
    $match: {
      operationType: "insert",
    },
  },
  {
    $lookup: {
      from: "users", // Assumes the collection name for users is 'users'
      localField: "student",
      foreignField: "_id",
      as: "studentInfo",
    },
  },
  {
    $unwind: "$studentInfo", // Unwind the array produced by $lookup
  },
  {
    $addFields: {
      studentName: "$studentInfo.name", // Assumes the name field in User document is 'name'
    },
  },
  {
    $project: {
      _id: 1,
      student: 1,
      studentName: 1,
      session: 1,
      scanTime: 1,
    },
  },
];

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);
