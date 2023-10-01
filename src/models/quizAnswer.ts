import mongoose, { Document, Schema } from "mongoose";

// ... (rest of your code)

interface IAnswer extends Document {
  quiz: mongoose.Schema.Types.ObjectId; // Reference to Quiz model
  answers: Answer[];
  user: mongoose.Schema.Types.ObjectId; // Reference to Student model
  dateSubmitted: Date;
}

interface Answer {
  questionId: number; //index of the question in the quiz
  selectedOption: number; // Index of the selected option
}

const AnswerSchema = new Schema<IAnswer>({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answers: [
    {
      questionId: { type: Number, required: true },
      selectedOption: { type: Number, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateSubmitted: { type: Date, default: Date.now },
});

export default mongoose.model<IAnswer>("Answer", AnswerSchema);
