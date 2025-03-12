import { Request, Response } from "express";
import {
  createUserService,
  getUserService,
  getUsersService,
} from "@services/usersService";

// Create or Update User
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, role, data } = req.body;

  try {
    if (!firstName || !lastName || !email || !role) {
      throw new Error("Please include all required user information.");
    }

    const user = await createUserService(
      firstName,
      lastName,
      email,
      role,
      data
    );

    res.json({ user, message: "User saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await getUserService(req.params.id);

    res.json(data.Item || { message: "User not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
export const getUsers = async (_: Request, res: Response) => {
  try {
    const data = await getUsersService();

    res.json(data.Items || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
