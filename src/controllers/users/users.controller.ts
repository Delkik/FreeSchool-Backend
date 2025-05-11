import { Request, Response } from "express";
import {
  createUserService,
  getChildrenService,
  getUserService,
  getUsersService,
  updateUserService,
} from "@services/usersService";

// Create or Update User
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, role, parentId, grade, rating } =
    req.body;

  try {
    if (!firstName || !lastName || !email || !role) {
      throw new Error("Please include all required user information.");
    }

    const user = await createUserService(
      firstName,
      lastName,
      email,
      role,
      parentId,
      grade,
      rating
    );

    res.status(201).json({ user, message: "User saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const data = await updateUserService(user);

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await getUserService(req.params.id);

    res.status(200).json(data.Item || { message: "User not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
export const getUsers = async (_: Request, res: Response) => {
  try {
    const data = await getUsersService();

    res.status(200).json(data.Items || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getChildren = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await getChildrenService(id);

    res.status(200).json(data.Items || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
