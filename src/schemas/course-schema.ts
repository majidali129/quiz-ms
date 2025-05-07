import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must not exceed 100 characters").trim(),

  description: z.string().max(500, "Description must not exceed 500 characters").trim().optional(),
  code: z.string().min(1, "Course code is required"),
  requireApproval: z.boolean().optional(),
  category: z.string().min(3, "Category name must be at least 3 characters long").trim(),

  price: z.coerce.number().min(0, "Price must be a positive value"),

  duration: z.coerce.number().min(1, "Duration must be at least 1 minute").optional(),

  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Level is required",
    invalid_type_error: "Invalid level type",
  }),
});
