import express from "express";
import * as quizController from "@controllers/quizController";
import { authenticateJWT } from "@middlewares/auth";
import checkUserRole from "@middlewares/roleAuthorization";

const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  //   checkUserRole(["Admin", "Lecturer"]), //TODO: uncomment this line
  quizController.createQuiz
);

router.get("/:id", authenticateJWT, quizController.getQuizById);

router.get(
  "/",
  authenticateJWT,
  checkUserRole(["Admin"]),
  quizController.getAllQuizes
);

router.get(
  "/module/:moduleId",
  authenticateJWT,
  quizController.getQuizzesByModuleId
);

router.put(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin", "Lecturer"]),
  quizController.updateQuiz
);
router.delete(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin", "Lecturer"]),
  quizController.deleteQuiz
);

export default router;
