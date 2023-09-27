import { NextFunction, Request, Response } from "express";
import User, { IUser } from "@models/user";
import { AppError } from "@middlewares/errorHandler";

class UserController {
  // Create a new user
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser = new User(req.body);
      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }

  // Get all users
  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log("Endpoint hit", req.user);
    try {
      if (true) {
        throw new AppError(400, "Bad Request");
      }
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      //   res.status(500).json({ message: "Error fetching users", error });
      next(error);
    }
  }

  // Get a single user by ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  // Update a user by ID
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  // Delete a user by ID
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
}

export default new UserController();
