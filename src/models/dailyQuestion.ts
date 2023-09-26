import mongoose, { Document, Schema } from "mongoose";

export interface IDailyQuestion extends Document {
  /**
   * This model represents the daily questions sent to students.
   * It includes the question text, possible answer options, the index of the correct answer,
   * the date the question was sent, and the reward amount in Pave Coins for answering correctly.
   */
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in the options array
  date: Date;
  reward: number; // Amount of Pave Coins for correct answer
}

const DailyQuestionSchema = new Schema<IDailyQuestion>({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  reward: { type: Number, required: true },
});

export default mongoose.model<IDailyQuestion>(
  "DailyQuestion",
  DailyQuestionSchema
);
