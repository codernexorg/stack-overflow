import { z } from "zod";
export const loginSchema = z.object({
  username: z.string().min(4, { message: "Please enter your username" }),
  password: z.string().min(6, { message: "Please enter your password" }),
});

export const signUpSchema = z.object({
  username: z.string().min(4, { message: "Please enter your username" }),
  password: z.string().min(6, { message: "Please enter your password" }),
  name: z.string().min(4, { message: "Please enter a valid name" }),
  email: z.string().email("Please enter your email address"),
});

export const questionSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  expectation: z.string(),
});
