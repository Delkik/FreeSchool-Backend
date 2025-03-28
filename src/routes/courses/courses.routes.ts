import { Router } from "express";
import {
  createCourse,
  updateCourse,
  getCourse,
  getCourses,
  enrollInCourse,
  borrowCourse,
  searchCourses,
  listUserCourses,
} from "@controllers/courses/courses.controller";
import assignmentRoutes from "./assignments";

const router = Router();

router.post("/", createCourse);
router.get("/", getCourses);

router.get("/:id", getCourse);
router.put("/:id", updateCourse);

router.post("/:id/user/:userId/enroll", enrollInCourse);
router.post("/:id/user/:userId/borrow", borrowCourse);
router.use("/:id/assignments", assignmentRoutes);

router.get("/search/:name", searchCourses);

router.get("/user/:id", listUserCourses);

export default router;
