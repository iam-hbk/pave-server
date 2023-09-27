import { Request, Response } from "express";
import DailyQuestion from "@models/dailyQuestion";

import { Request as Req, Response as Res } from "express";
import DailyQuestionModel from "@models/dailyQuestion";

export const createDailyQuestion = async (req: Request, res: Response) => {
  try {
    const dailyQuestion = new DailyQuestion(req.body);
    await dailyQuestion.save();
    res.status(201).json(dailyQuestion);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getDailyQuestionById = async (req: Request, res: Response) => {
  try {
    const dailyQuestion = await DailyQuestion.findById(req.params.id);
    if (!dailyQuestion)
      return res.status(404).json({ message: "DailyQuestion not found" });
    res.json(dailyQuestion);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDailyQuestions = async (req: Request, res: Response) => {
  try {
    const dailyQuestions = await DailyQuestion.find();
    res.json(dailyQuestions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDailyQuestion = async (req: Request, res: Response) => {
  try {
    const updatedDailyQuestion = await DailyQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDailyQuestion)
      return res.status(404).json({ message: "DailyQuestion not found" });
    res.json(updatedDailyQuestion);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDailyQuestion = async (req: Request, res: Response) => {
  try {
    const deletedDailyQuestion = await DailyQuestion.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDailyQuestion)
      return res.status(404).json({ message: "DailyQuestion not found" });
    res.json({ message: "DailyQuestion deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
