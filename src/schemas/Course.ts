export interface Course {
  id: string;
  courseName: string;
  description: string;
  teacherId?: string;
  maxCount: number;
  grade: string;
  subject?: string;
  extraInfo?: string;
  rating?: number;
}
