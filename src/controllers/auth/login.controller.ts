import { loginUser } from "@services/authService";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    // The result contains tokens (ID token, access token, refresh token) under result.AuthenticationResult.
    res.status(200).json(result);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(400).json({ error: "User login failed", details: error });
  }
};