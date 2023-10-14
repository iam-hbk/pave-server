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
  title: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * This model represents quizzes created by lecturers for specific classes.
 * Each quiz can have multiple questions, and each question has multiple options
 * and a correct answer (represented by the index of the correct option in the options array).
 */
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
  title: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
//dummy quiz

const newQuiz = {
  module: "651835453acb0d7dd3434fe0", // Assuming this ObjectId corresponds to a valid Module document
  questions: [
    {
      questionText: "What is the capital of France?",
      options: ["Rome", "Madrid", "Paris", "Berlin"],
      correctAnswer: 2, // Index of the correct answer in the options array
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1, // Index of the correct answer in the options array
    },
    {
      questionText: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: 3, // Index of the correct answer in the options array
    },
  ],
  title: "General Knowledge Quiz",
};
