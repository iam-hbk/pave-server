// UserDailyQuestionAnswers.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IUserDailyQuestionAnswers extends Document {
  /**
   * This model captures the relationship between a user and the daily questions they've answered,
   * along with their selected answers and the date they answered.
   */
  user: mongoose.Schema.Types.ObjectId; // Reference to User model
  dailyQuestion: mongoose.Schema.Types.ObjectId; // Reference to DailyQuestion model
  selectedAnswer: string;
  isCorrect: boolean;
  paveCoinsAwarded: number;
  dateAnswered: Date;
}

const UserDailyQuestionAnswersSchema = new Schema<IUserDailyQuestionAnswers>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dailyQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DailyQuestion",
    required: true,
  },
  selectedAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  paveCoinsAwarded: { type: Number, required: true },
  dateAnswered: { type: Date, default: Date.now },
});

export default mongoose.model<IUserDailyQuestionAnswers>(
  "UserDailyQuestionAnswers",
  UserDailyQuestionAnswersSchema
);
