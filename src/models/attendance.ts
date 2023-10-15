import mongoose, { Document, Schema } from "mongoose";

export interface IAttendance extends Document {
  student: mongoose.Schema.Types.ObjectId; // Reference to User model (student)
  session: mongoose.Schema.Types.ObjectId; // Reference to Session model
  scanTime: Date; // The time when the student scanned the QR code
  rewardAmount: number; // Amount of PaveCoins rewarded to the student for this attendance
  studentName: string;
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
  studentName: { type: String, required: true },
});

export const newAttendancePipeline = [
  {
    $match: {
      operationType: "insert",
    },
  },
];
export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);
