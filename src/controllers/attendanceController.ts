import { Request, Response } from "express";
import Attendance from "@models/attendance";

export const createAttendance = async (req: Request, res: Response) => {
  /**
   * This function will handle the creation of a new attendance record.
   */
  try {
    // check if the student has already checked in
    const existingAttendance = await Attendance.findOne({
      student: req.body.student,
      session: req.body.session,
    });
    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already exists" });
    }

    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error creating attendance", error });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  /**
   * This function will handle the retrieval of a single attendance record by ID.
   */
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

export const getAllAttendances = async (req: Request, res: Response) => {
  /**
   * This function will handle the retrieval of all attendance records.
   */

  try {
    const attendances = await Attendance.find();
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendances", error });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  /**
   * This function will handle the update of a single attendance record by ID.
   */

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance", error });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  /**
   * This function will handle the deletion of a single attendance record by ID.
   */

  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error });
  }
};
