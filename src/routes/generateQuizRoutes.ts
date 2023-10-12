//routes to generate quizes
import express, { NextFunction, Request, Response } from "express";
import * as generateQuizController from "../controllers/generateQuizController";

const router = express.Router();

router.post("/", generateQuizController.uploadDocument);

export default router;
