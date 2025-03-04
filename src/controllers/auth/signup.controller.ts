import { confirmUser, signUpUser } from "@services/authService";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { password, email, firstName, lastName } = req.body;
  try {
    console.log(email, password);
    const result = await signUpUser(email, password, firstName, lastName);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(400).json({ error: "User signup failed", details: error });
  }
}

export const confirmSignUp = async (req: Request, res: Response) => {
    const { email, confirmationCode } = req.body;
    try {
      const result = await confirmUser(email, confirmationCode);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error confirming user:", error);
      res.status(400).json({ error: "User confirmation failed", details: error });
    }
  }