// middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      // token.trim(),
      token,
      process.env.JWT_SECRET_KEY as string,
      (err: any, user: any) => {
        if (err) {
          // console.log("[err]:", err);
          return res
            .status(403)
            .json({ message: "Your session has expired, please login" });
        }
        req.user = user as JwtPayload;
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};
