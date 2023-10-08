import express from "express";
import * as paveCoinTransactionController from "../controllers/paveCoinTransactionController";
import { authenticateJWT } from "../middlewares/auth";
import checkUserRole from "../middlewares/roleAuthorization";

const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  checkUserRole(["Admin", "Student", "Lecturer"]),
  paveCoinTransactionController.createTransaction
);
router.get(
  "/:id",
  authenticateJWT,
  paveCoinTransactionController.getTransactionById
);
router.get(
  "/",
  authenticateJWT,
  checkUserRole(["Admin"]),
  paveCoinTransactionController.getAllTransactions
);

router.put(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin"]),
  paveCoinTransactionController.updateTransaction
);
router.delete(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin"]),
  paveCoinTransactionController.deleteTransaction
);

router.get(
  "/user/:userId",
  authenticateJWT,
  paveCoinTransactionController.getTransactionsByUserId
);

export default router;
