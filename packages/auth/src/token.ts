import jwt from "jsonwebtoken";

export function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY || "adbajbdnajbdjadjnb", {
    noTimestamp: true,
  });
}

export function verifyToken(token) {
  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY || "adbajbdnajbdjadjnb"
  );
  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    throw new Error("Invalid token");
  }

  return decoded.id; //
}
