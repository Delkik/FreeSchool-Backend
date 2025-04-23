import { Router } from "express";
import {
  createAssignment,
  updateAssignment,
  getAssignment,
  getAssignments,
  submitAssignment,
  getSubmittedAssignment,
} from "@controllers/courses/assignments/assignments.controller";

const router = Router({ mergeParams: true });

router.post("/", createAssignment);
router.get("/", getAssignments);

router.get("/:assignmentId", getAssignment);
router.put("/:assignmentId", updateAssignment);

// User submissions
router.get("/:assignmentId/user/:userId", getSubmittedAssignment);

router.post("/:assignmentId/user/:userId/submit", submitAssignment);

export default router;
