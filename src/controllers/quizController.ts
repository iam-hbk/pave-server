import { Request, Response } from "express";
import Quiz from "../models/quiz";
import Module from "../models/module";

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
export const getQuizzesByModuleID = async (req: Request, res: Response) => {
  try {
    // Find the module with the specified moduleCode
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const quizzes = await Quiz.find({ module: req.params.id });
    if (!quizzes) return res.status(404).json({ message: "Quiz not found" });

    const formattedQuizzes = quizzes.map((quiz) => {
      return {
        ...quiz.toObject(),
        moduleCode: module.moduleCode,
        moduleName: module.moduleName,
      };
    });

    res.json({ quizzes: formattedQuizzes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizzesByModuleCode = async (req: Request, res: Response) => {
  try {
    // Retrieve moduleCode from request parameters
    const { moduleCode } = req.params;

    // Find the module with the specified moduleCode
    const module = await Module.findOne({ moduleCode });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Use the module's ID to find quizzes
    const quizzes = await Quiz.find({ module: module._id });
    //Format the quizzes
    const formattedQuizzes = quizzes.map((quiz) => {
      return {
        ...quiz.toObject(),
        moduleCode: module.moduleCode,
        moduleName: module.moduleName,
      };
    });

    // Send the quizzes to the client
    res.status(200).json({ quizzes: formattedQuizzes });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
