import express from "express";
import * as dailyQuestionController from "../controllers/dailyQuestionController";
import { authenticateJWT } from "../middlewares/auth";
import checkUserRole from "../middlewares/roleAuthorization";

const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  checkUserRole(["Admin"]),
  dailyQuestionController.createDailyQuestion
);

/**Get today's dailyQuestion */
router.get(
  "/daily/today",
  authenticateJWT,
  dailyQuestionController.getDailyQuestionByTodayDate
);

router.get(
  "/:id",
  authenticateJWT,
  dailyQuestionController.getDailyQuestionById
);
router.get("/", authenticateJWT, dailyQuestionController.getAllDailyQuestions);
router.put(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin"]),
  dailyQuestionController.updateDailyQuestion
);
router.delete(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin"]),
  dailyQuestionController.deleteDailyQuestion
);

export default router;
