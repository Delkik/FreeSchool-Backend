import {
  getAssignmentGrade,
  getCourseGrade,
  getCourseGrades,
  getGrades,
  putAssignmentGrade,
  putCourseGrade,
} from "@controllers/users/grades/grades.controller";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/", getGrades);

router.get("/courses/:courseId", getCourseGrade);
router.post("/courses/:courseId", putCourseGrade);

router.get("/courses/:courseId/assignments", getCourseGrades);

router.get("/courses/:courseId/assignments/:assignmentId", getAssignmentGrade);
router.post("/courses/:courseId/assignments/:assignmentId", putAssignmentGrade);

export default router;
