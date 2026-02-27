import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../../.env") });

export const SECRET: string = process.env.JWT_SECRET || "xploitsim_shared_secret";

/**
 * Signs a payload with the shared secret.
 */
export function signToken(payload: any): string {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

/**
 * Verifies a token with the shared secret.
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
