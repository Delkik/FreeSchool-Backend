import { BaseUser } from "./User";

export interface Document {
  id: string;
  link: string;
  title: string;
  description: string;
  owner: BaseUser;
}
