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
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

export default router;
