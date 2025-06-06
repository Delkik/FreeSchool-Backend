import { BaseUser } from "@schemas/User";
import { loginUser } from "@services/authService";
import { getChildrenService, queryUserService } from "@services/usersService";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Please provide an email or password.");
    }

    const result = await loginUser(email, password);

    const user = await queryUserService({ email });

    const children = await getChildrenService((user.Items?.[0] as BaseUser).id);

    res.status(200).json({
      result: result.AuthenticationResult,
      user: user.Items?.[0],
      children: children.Items,
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(400).json({ error: error.message, details: error });
  }
};
