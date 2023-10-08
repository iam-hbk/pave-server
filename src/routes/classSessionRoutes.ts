import express from "express";
import * as classSessionController from "../controllers/classSessionController";

const router = express.Router();

//TODO: Add authentication middleware and authorization middleware

// Route to create a new class session
router.post("/create", classSessionController.createClassSession);

//Route to get class sessions by lecturer id
router.get("/lecturer/:id", classSessionController.getClassSessionByLecturerId);

// Route to fetch all class sessions
router.get("/", classSessionController.getAllClassSessions);

// Route to fetch a specific class session by ID
router.get("/:id", classSessionController.getClassSessionById);

// Route to update a specific class session by ID
router.put("/:id", classSessionController.updateClassSession);

// Route to delete a specific class session by ID
router.delete("/:id", classSessionController.deleteClassSession);

export default router;
