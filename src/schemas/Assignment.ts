export interface Assignment {
  id: string;
  name: string;
  maxGrade: number;
  courseId: string;
  description: string;
  section: number;
  due: Date;
}

export interface UserAssignment {
  userId: string;
  submission: string;
  submitDate: Date;
}
