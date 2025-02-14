import z from "zod";

export const loginSchema = z.object({
  role: z.enum(["student", "teacher"]),
  email: z
    .string()
    .trim()
    .min(5, "Email is required")
    .email("Please enter a valid email")
    .optional(),
  password: z.string().trim().min(8, "Password must be 8 characters long"),
  registerationNo: z
    .string()
    .trim()
    .min(15, "Please enter your university registeration no")
    .max(18, "registeration number must be below 18 characters")
    .optional(),
});

// export const teacherLoginSchema = z.object({
//   email: z.string().trim().email("Please enter a valid mail address"),
//   password: z.string().trim().min(8, "Password must be 8 characters long"),
// });
