
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import AppError from "../../utils/AppError.js";

import { blacklistToken } from "./helpers/tokenBlacklist.js";

function generateToken(id) {
  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT secret is not configured", 500);
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    }
  );
}

function sanitizeUser(userDoc) {
  const userObject = userDoc.toObject();
  delete userObject.password;
  return userObject;
}

export async function registerService({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) throw new AppError("Email already in use", 400);

  const user = await User.create({ name, email, password });
  return sanitizeUser(user);
}

export async function loginService({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid email or password", 401);

  const match = await user.matchPassword(password);
  if (!match) throw new AppError("Invalid email or password", 401);

  const token = generateToken(user._id);
  return { user: sanitizeUser(user), token };
}

export function logoutService(token) {
  if (!token) {
    throw new AppError("Authorization token is required", 400);
  }

  blacklistToken(token);
  return { message: "Logged out successfully" };
}
