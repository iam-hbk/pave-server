import express from "express";
import * as attendanceController from "../controllers/attendanceController";
import { authenticateJWT } from "../middlewares/auth";
import checkUserRole from "../middlewares/roleAuthorization";

const router = express.Router();

router.post(
  "/",
  authenticateJWT,
  attendanceController.createAttendance
);
// get attendance by class session id
router.get("/session/:id", attendanceController.getAttendanceBySessionId);

router.get("/:id", authenticateJWT, attendanceController.getAttendanceById);

router.get("/", authenticateJWT, attendanceController.getAllAttendances);

router.put(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin", "Lecturer"]),
  attendanceController.updateAttendance
);

router.delete(
  "/:id",
  authenticateJWT,
  checkUserRole(["Admin", "Lecturer"]),
  attendanceController.deleteAttendance
);

export default router;
