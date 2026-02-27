import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const SECRET = process.env.JWT_SECRET || "xploitsim_shared_secret";

/**
 * Signs a payload with the shared secret.
 */
export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

/**
 * Verifies a token with the shared secret.
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

export { SECRET };

