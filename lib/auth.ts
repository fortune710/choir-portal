import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

interface JwtPayload {
    userId: string;
 }

/**
 * Generate JWT Token
 */
export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

/**
 * Verify JWT Token
 */
export function verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch (error) {
        console.error("Error in GET request:", error);
      return null;
    }
  }
