import { Request, Response } from "express";
import {
  borrowCourseService,
  createCourseService,
  enrollInCourseService,
  getCourseService,
  getCoursesService,
  listUserCoursesService,
  searchCoursesService,
  updateCourseService,
} from "@services/coursesService";

// Create or Update Course
export const createCourse = async (req: Request, res: Response) => {
  const { courseName, description, maxCount, teacher, grade } = req.body;

  try {
    if (!courseName || !description || !maxCount || !grade) {
      throw new Error("Please include all required course information.");
    }

    const course = await createCourseService(
      courseName,
      description,
      maxCount,
      grade,
      teacher
    );

    res.status(201).json({ course, message: "Course saved successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { course } = req.body;
    const data = await updateCourseService(course);

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Course by ID
export const getCourse = async (req: Request, res: Response) => {
  try {
    const data = await getCourseService(req.params.id);

    res.status(200).json(data.Item || { message: "Course not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Courses
export const getCourses = async (_: Request, res: Response) => {
  try {
    const data = await getCoursesService();

    res.status(200).json(data.Items || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const { userId, title, description } = req.body;

    const data = await enrollInCourseService(
      courseId,
      userId,
      title,
      description
    );

    res.status(200).json(data || { message: "Couldn't enroll in course" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const borrowCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const { userId, title, description } = req.body;

    const data = await borrowCourseService(
      courseId,
      userId,
      title,
      description
    );

    res.status(200).json(data || { message: "Couldn't borrow course" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listUserCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const data = await listUserCoursesService(userId);

    res.status(200).json(data.Items || { message: "Couldn't find courses" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const searchCourses = async (req: Request, res: Response) => {
  try {
    const courseName = req.params.name;

    const data = await searchCoursesService(courseName);

    res.status(200).json(data.Items || { message: "Couldn't find courses" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
