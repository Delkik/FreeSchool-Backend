import { loginUser } from "@services/authService";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error('Please provide an email or password.');
    }

    const result = await loginUser(email, password);
    // The result contains tokens (ID token, access token, refresh token) under result.AuthenticationResult.
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(400).json({ error: error.message, details: error });
  }
};