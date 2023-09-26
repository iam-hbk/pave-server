import mongoose, { Document, Schema } from "mongoose";

export interface IEngagementReport extends Document {
  /**
   * This model represents reports on student engagement.
   * It includes metrics like attendance rate, quiz scores, and a list of recommendations for improvement.
   * The report is associated with a specific student and has a date of creation.
   */

  user: mongoose.Schema.Types.ObjectId; // Reference to User model (student)
  engagementMetrics: {
    attendanceRate: number;
    quizScores: number[];
    // Additional metrics can be added here
  };
  recommendations: string[];
  date: Date;
}

const EngagementReportSchema = new Schema<IEngagementReport>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  engagementMetrics: {
    attendanceRate: { type: Number, required: true },
    quizScores: [{ type: Number, required: true }],
  },
  recommendations: [{ type: String, required: true }],
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IEngagementReport>(
  "EngagementReport",
  EngagementReportSchema
);
