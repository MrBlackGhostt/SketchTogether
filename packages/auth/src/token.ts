import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.SECRET_KEY || "adbajbdnajbdjadjnb");
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET_KEY || "adbajbdnajbdjadjnb");
}
