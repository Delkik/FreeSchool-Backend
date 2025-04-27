export interface Grade {
  numberGrade: number;
  gradeDate: number;
  courseId: string;
  courseName: string;
  assignmentId?: string;
  assignmentName?: string;
  type: "course" | "assignment";
}
