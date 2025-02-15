import { z } from "zod";

export const quizEnrollmentSchema = z.object({
  teacher: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid teacher ID"), // Ensures valid MongoDB ObjectId
  registrationId: z
    .string()
    .min(15, "Registration ID must be at least 15 characters")
    .max(18, "Registration ID must be at most 18 characters"),
  course: z.string().trim().min(3, "Course name must be at least 3 characters"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});
