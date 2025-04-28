import z from "zod";

export const signupSchema = z.object({
  fullName: z.string().trim().min(5, "Fullname must be 5 characters long"),
  username: z.string().trim().min(3, "Fullname must be 3 characters long").max(15, "Username can't be more that 15 characters"),
  email: z.string().trim().email("Please enter a valid mail address"),
  password: z.string().trim().min(8, "Password must be 8 characters long"),
  registerationId: z.string().trim().min(15, "Registration ID must be at least 15 characters").max(18, "Registration ID must be at most 18 characters").optional(),
  role: z.enum(["student", "teacher"]),
});
