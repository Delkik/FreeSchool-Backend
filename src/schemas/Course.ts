import { BaseUser } from "./User";

export interface Course {
  id: string;
  courseName: string;
  description: string;
  teacher?: BaseUser;
  maxCount: number;
  grade: string;
  subject?: string;
  extraInfo?: string;
  rating?: number;
}

export interface CourseData {
  borrowed: boolean;
  startDate: Date;
}
