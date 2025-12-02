import { registerService, loginService } from "./auth.service.js";

export async function register(req, res, next) {
  try {
    const user = await registerService(req.body);
    res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { user, token } = await loginService(req.body);
    res.json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
}
