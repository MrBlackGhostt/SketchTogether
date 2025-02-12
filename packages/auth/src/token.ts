import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.SECRET_KEY || "adbajbdnajbdjadjnb");
}
