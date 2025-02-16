import { Response, NextFunction } from "express";
import { verifyToken } from "@repo/auth/token";
import { AuthRequest } from "../types";

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const decoded = verifyToken(token!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
}
