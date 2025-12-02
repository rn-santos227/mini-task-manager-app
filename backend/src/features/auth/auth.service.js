import jwt from "jsonwebtoken";
import User from "./user.model.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}

export async function registerService({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already in use");

  const user = await User.create({ name, email, password });
  return user;
}

export async function loginService({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const match = await user.matchPassword(password);
  if (!match) throw new Error("Invalid email or password");

  const token = generateToken(user._id);
  return { user, token };
}
