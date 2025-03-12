export type Role = "teacher" | "parent" | "student";

export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  grade?: string;
  pfp?: string;
  isFirstTime: boolean;
}
