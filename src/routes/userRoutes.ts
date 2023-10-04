import { Router } from "express";
import userController from "@controllers/userController";
import authController from "@controllers/authController";
import { authenticateJWT } from "@middlewares/auth";
import checkUserRole from "@middlewares/roleAuthorization";
const router: Router = Router();

// Public Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Create a new user
router.post(
  "/",
  authenticateJWT,
  checkUserRole(["Admin"]),
  userController.createUser
);

// Get all users
router.get(
  "/",
  authenticateJWT,
  checkUserRole(["Admin"]),
  userController.getAllUsers
);

// Get a single user by ID
router.get("/:id", authenticateJWT, userController.getUserById);

// Update a user by ID
router.put("/:id", authenticateJWT, userController.updateUser);
router.put("/password/:id", authController.updatePassword);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

//Check in user
router.post("/checkin", authenticateJWT, userController.dailyCheckin);

//Get user's ranking by ID
router.get("/ranking/:id", userController.getUserRanking);

export default router;
