import { IQuestion } from "./user";

export interface ITag {
  id: string;
  name: string;
  questions: IQuestion[];
  created_at: Date;
  updated_at: Date;
}
