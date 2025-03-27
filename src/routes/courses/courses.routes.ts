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

const router = Router();

router.post("/", createCourse);
router.get("/", getCourses);

router.get("/:id", getCourse);
router.put("/:id", updateCourse);

router.post("/:id/enroll", enrollInCourse);
router.post("/:id/borrow", borrowCourse);

router.get("/search/:name", searchCourses);

router.get("/user/:id", listUserCourses);

export default router;
