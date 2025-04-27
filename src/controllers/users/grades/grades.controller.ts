import {
  getAssignmentGradeService,
  getCourseGradeService,
  getCourseGradesService,
  getGradesService,
  putAssignmentGradeService,
  putCourseGradeService,
} from "@services/gradesService";
import { Request, Response } from "express";

export const getGrades = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const grades = await getGradesService(userId);

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseGrades = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;

    const grades = (await getCourseGradesService(userId, courseId)) || [];

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseGrade = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;

    const grade = await getCourseGradeService(userId, courseId);

    res.status(201).json({ grade, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const putCourseGrade = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;
    const { grade, courseName } = req.body;

    const grades = await putCourseGradeService(
      userId,
      courseId,
      grade,
      courseName
    );

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssignmentGrade = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;
    const assignmentId = req.params.assignmentId;

    const grade = await getAssignmentGradeService(
      userId,
      courseId,
      assignmentId
    );

    res.status(201).json({ grade, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const putAssignmentGrade = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;
    const assignmentId = req.params.assignmentId;

    const { grade, courseName, assignmentName } = req.body;

    const grades = await putAssignmentGradeService(
      userId,
      courseId,
      assignmentId,
      grade,
      courseName,
      assignmentName
    );

    res.status(201).json({ grades, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
