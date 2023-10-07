import express from "express";
import * as moduleController from "../controllers/moduleController";
import { authenticateJWT } from "../middlewares/auth";
import checkUserRole from "../middlewares/roleAuthorization";

const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  checkUserRole(["Admin", "Lecturer"]),
  moduleController.createModule
);

router.get("/:id", authenticateJWT, moduleController.getModuleById);

router.get(
  "/",
  authenticateJWT,
  checkUserRole(["Admin"]),
  moduleController.getAllModules
);

router.put('/:id', authenticateJWT, checkUserRole(['Admin', 'Lecturer']), moduleController.updateModule);
router.delete('/:id', authenticateJWT, checkUserRole(['Admin']), moduleController.deleteModule);

export default router;
