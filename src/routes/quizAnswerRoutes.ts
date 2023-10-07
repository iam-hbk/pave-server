import express, { NextFunction, Request, Response } from "express";
import {
  addAnswer,
  checkQuizExists,
  checkStudentExists,
  getAnswer,
} from "../controllers/quizAnswerController";
const router = express.Router();

router.post("/answers", checkQuizExists, checkStudentExists, addAnswer);
router.get(
  "/:quizId/students/:studentId/answers",
  checkQuizExists,
  checkStudentExists,
  getAnswer
);
router.get(
  "/:quizId/students/:studentId/answers",
  checkQuizExists,
  checkStudentExists,
  getAnswer
);
router.get("/answers", checkQuizExists, checkStudentExists);

export default router;
