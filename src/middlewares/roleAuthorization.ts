import { Request, Response, NextFunction } from "express";

type Role = "Student" | "Lecturer" | "Admin";

const roleAuthorization = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export default roleAuthorization;
