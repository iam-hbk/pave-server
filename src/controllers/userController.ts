import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
// import { AppError } from "../middlewares/errorHandler";
import { JsonUser } from "../interfaces/user";

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
      const token = jwt.sign(
        {
          role: user.role,
          id: user._id,
        },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "7d",
        }
      );
      const userResponse: JsonUser = {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        profilePicture: user.profilePicture,
        wallet: user.wallet,
        modules: user.modules,
        token: token,
        consecutiveLogins: user.consecutiveLogins,
      };

      res.status(200).json({ user: userResponse });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  // Update a user by ID
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      //reject the request if they try to update the password here
      if (req.body.password) {
        res.status(403).json({
          message:
            "You cannot update the password here ! use the password endpoint instead",
        });
        return;
      }
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

  //Daily checkin
  public async dailyCheckin(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        res.status(401).json({
          message: "User not found",
        });
        return;
      }
      user.wallet += 10; // Reward user with 10 coins for each daily check-in

      //Login Streak check
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (user.lastLogin.toDateString() === today.toDateString()) {
        // Already logged in today
        res.status(200).json({
          message: "Already checked in today",
        });
        return;
      }

      if (user.lastLogin.toDateString() === yesterday.toDateString()) {
        // Consecutive login
        user.consecutiveLogins += 1;
  
      } else {
        // Reset counter
        user.consecutiveLogins = 1;
      }

      if (user.consecutiveLogins === 5) {
        //extra reward for 7-day streak
        user.wallet += 50;
        user.consecutiveLogins = 0;
      }
      user.lastLogin = today;
      await user.save();

      res.status(200).json({
        message: "Checked in successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error checking user in ! please try again later",
        error,
      });
    }
  }

  //Get user's ranking in terms of pavePoints by ID
  public async getUserRanking(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const users = await User.find().sort({ wallet: -1 });
      const ranking = users.findIndex((user) => user._id == req.params.id);
      res.status(200).json({ ranking: ranking + 1 });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }
}

export default new UserController();
