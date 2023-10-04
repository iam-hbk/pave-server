import Answer from "@models/quizAnswer";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Middleware to check if the quiz exists
export async function checkQuizExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { quizId } = req.params;
  const quiz = await mongoose.model("Quiz").findById(quizId);
  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }
  next();
}

// Middleware to check if the student exists
export async function checkStudentExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.body;
  const student = await mongoose.model("User").findById(userID);
  if (!student) {
    return res.status(404).send("Student not found");
  }
  next();
}

export async function addAnswer(req: Request, res: Response) {
  const { quizId, studentId } = req.params;
  const { answers } = req.body;

  try {
    const answer = new Answer({
      quiz: quizId,
      answers,
      student: studentId,
    });
    await answer.save();
    res.status(201).send(answer);
  } catch (error) {
    res.status(400).send(error);
  }
}
export async function getAnswer(req: Request, res: Response) {
  const { quizId, studentId } = req.params;

  try {
    const answer = await Answer.find({ quiz: quizId, student: studentId });
    if (!answer) {
      return res.status(404).send("Answers not found");
    }
    res.send(answer);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllAnwers(req: Request, res: Response) {
  const { quizId } = req.params;

  try {
    const answers = await Answer.find({ quiz: quizId });
    if (!answers) {
      return res.status(404).send("Answers not found");
    }
    res.send(answers);
  } catch (error) {
    res.status(500).send(error);
  }
}
