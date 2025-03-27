import { Request, Response } from "express";
import {
  createAssignmentService,
  submitAssignmentService,
  getAssignmentService,
  getAssignmentsService,
  updateAssignmentService,
  getSubmittedAssignmentService,
} from "@services/assignmentsService";

// Create or Update Assignment
export const createAssignment = async (req: Request, res: Response) => {
  const courseId = req.params.id;
  const { assignmentName, description, maxGrade, section, due } = req.body;

  try {
    if (!assignmentName || !description || !maxGrade || !section || !due) {
      throw new Error("Please include all required assignment information.");
    }

    const assignment = await createAssignmentService(
      assignmentName,
      description,
      maxGrade,
      section,
      due,
      courseId
    );

    res
      .status(201)
      .json({ assignment, message: "Assignment saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const { assignment } = req.body;
    const data = await updateAssignmentService(assignment);

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Assignment by ID
export const getAssignment = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const assignmentId = req.params.assignmentId;

    const data = await getAssignmentService(courseId, assignmentId);

    res.status(200).json(data.Item || { message: "Assignment not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Assignments
export const getAssignments = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const data = await getAssignmentsService(courseId);

    res.status(200).json(data.Items || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const submitAssignment = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const assignmentId = req.params.assignmentId;
    const userId = req.params.userId;
    const { submission } = req.body;

    const data = await submitAssignmentService(
      courseId,
      userId,
      assignmentId,
      submission
    );

    res.status(200).json(data || { message: "Couldn't submit assignment" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubmittedAssignment = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const assignmentId = req.params.assignmentId;
    const userId = req.params.userId;

    const data = await getSubmittedAssignmentService(
      courseId,
      userId,
      assignmentId
    );

    res.status(200).json(data || { message: "Couldn't get submission" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
