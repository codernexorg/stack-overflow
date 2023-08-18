export interface IUser {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  email: string;
  password: string;
  questions: IQuestion[];
  addQuestion: (question: IQuestion) => void;
  created_at: Date;
  updated_at: Date;
}

export interface IQuestion {
  id: string;

  title: string;
  description: string;

  expectation?: string;

  user: IUser;

  created_at: Date;
  updated_at: Date;
}

export enum UserRole {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}

export interface ILogin {
  username: string;
  password: string;
}
