import { Request, Response } from "express";
import ClassSession from "@models/classSession";

// Create a new class session
export const createClassSession = async (req: Request, res: Response) => {
  try {
    const classSession = new ClassSession(req.body);
    await classSession.save();
    res
      .status(201)
      .json({
        message: "Class session created successfully",
        data: classSession,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating class session",
        error: (error as Error).message,
      });
  }
};

// Get all class sessions
export const getAllClassSessions = async (_req: Request, res: Response) => {
  try {
    const classSessions = await ClassSession.find();
    res.status(200).json({ data: classSessions });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching class sessions",
        error: (error as Error).message,
      });
  }
};

// Get a specific class session by ID
export const getClassSessionById = async (req: Request, res: Response) => {
  try {
    const classSession = await ClassSession.findById(req.params.id);
    if (!classSession) {
      return res.status(404).json({ message: "Class session not found" });
    }
    res.status(200).json({ data: classSession });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching class session",
        error: (error as Error).message,
      });
  }
};

// Update a class session by ID
export const updateClassSession = async (req: Request, res: Response) => {
  try {
    const classSession = await ClassSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!classSession) {
      return res.status(404).json({ message: "Class session not found" });
    }
    res
      .status(200)
      .json({
        message: "Class session updated successfully",
        data: classSession,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating class session",
        error: (error as Error).message,
      });
  }
};

// Delete a class session by ID
export const deleteClassSession = async (req: Request, res: Response) => {
  try {
    const classSession = await ClassSession.findByIdAndDelete(req.params.id);
    if (!classSession) {
      return res.status(404).json({ message: "Class session not found" });
    }
    res.status(200).json({ message: "Class session deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting class session",
        error: (error as Error).message,
      });
  }
};