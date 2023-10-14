export type GeneratedQuestion = {
  questionText: string;
  options: string[];
  correctAnswer: number;
};
export interface Quiz {
  _id: string;
  module: string;
  questions: GeneratedQuestion[];
  title: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
