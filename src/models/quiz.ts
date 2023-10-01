// models/Quiz.ts

import mongoose, { Document, Schema } from "mongoose";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in the options array
}
export interface IQuiz extends Document {
  /**
   * This model represents quizzes created by lecturers for specific classes.
   * Each quiz can have multiple questions, and each question has multiple options
   * and a correct answer (represented by the index of the correct option in the options array).
   */

  module: mongoose.Schema.Types.ObjectId; // Reference to Module model
  questions: Question[];
  date: Date;
  title: string;
}

const QuizSchema = new Schema<IQuiz>({
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
});

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
