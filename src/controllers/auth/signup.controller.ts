import { confirmUser, signUpUser } from "@services/authService";
import { createUserService } from "@services/usersService";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { password, email, firstName, lastName, role, parentId, grade } =
    req.body;
  try {
    const result = await signUpUser(email, password, firstName, lastName);

    const user = await createUserService(
      firstName,
      lastName,
      email,
      role,
      parentId,
      grade,
      result.UserSub
    );

    res.status(200).json({ ...result, user });
  } catch (error: any) {
    console.error("Error signing up user:", error);
    res.status(400).json({
      error: error.message || "Error signing up user",
      details: error,
    });
  }
};

export const confirmSignUp = async (req: Request, res: Response) => {
  const { email, confirmationCode } = req.body;
  try {
    const result = await confirmUser(email, confirmationCode);

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error confirming user:", error);
    res.status(400).json({
      error: error.message || "User confirmation failed",
      details: error,
    });
  }
};
