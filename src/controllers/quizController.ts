import { Request, Response } from "express";
import Quiz from "@models/quiz";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizzesByModuleId = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.find({ module: req.params.moduleId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllQuizes = async (req: Request, res: Response) => {
  try {
    const quizes = await Quiz.find();
    res.json(quizes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.json(updatedQuiz);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
