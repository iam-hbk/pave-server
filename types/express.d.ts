interface JwtPayload {
  id: string;
  role: "Student" | "Lecturer" | "Admin";
  iat: number;
  exp: number;
}

declare namespace Express {
  export interface Request {
    user?: JwtPayload;
  }
}
