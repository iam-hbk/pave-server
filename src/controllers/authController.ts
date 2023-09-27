import { Request, Response } from "express";
import User, { IUser } from "@models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user: IUser = new User({ ...req.body, password: hashedPassword });
      await user.save();
      // Generate a JWT token for the user
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1h",
      });

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "7d",
      });
      res.status(200).json({ message: "Logged in successfully", token, user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in user", error });
    }
  }
}

export default new AuthController();
