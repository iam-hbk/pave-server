import { Router } from "express";
import userController from "@controllers/userController";
import { authenticateJWT } from "@middlewares/auth";
const router: Router = Router();

// Public Routes
// router.post('/users/register', userController.register);
// router.post('/users/login', userController.login);F

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

export default router;
