export interface Assignment {
  id: string;
  name: string;
  maxGrade: number;
  courseId: string;
  description: string;
  section: number;
  due: Date;
}
