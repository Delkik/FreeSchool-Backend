export interface Grade {
  numberGrade: number;
  gradeDate: number;
  courseId: string;
  assignmentId?: string;
  type: "grade" | "assignment";
}
