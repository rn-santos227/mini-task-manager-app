import jwt from "jsonwebtoken";
import User from "../features/auth/user.model.js";
import { isTokenBlacklisted } from "../features/auth/helpers/tokenBlacklist.js";

export default async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = header.split(" ")[1];

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: "Token is invalidated. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
