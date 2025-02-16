import { z } from "zod";
//schema for inserting new analysis
export const insertAnalysisSchema = z.object({
  userId: z.string(),
  fileName: z.string(),
  fileUrl: z.string().url(),
  result: z.any(), // JSON data
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]),
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  createdAt: z.date().optional(),
});
// Schema for signing users in 
export const signInFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

//schema for signing up
export const signUpFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});