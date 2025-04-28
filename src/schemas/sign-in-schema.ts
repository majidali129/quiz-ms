import z from "zod";

export const signInSchema = z.object({
  role: z.enum(["student", "teacher"], { message: "Role must be either 'student' or 'teacher'" }),
  email: z.string().trim().min(5, "Email is required").email("Please enter a valid email").optional(),
  password: z.string().trim().min(8, "Password must be 8 characters long"),
  registerationId: z.string().trim().min(15, "Please enter your university registeration no").max(18, "registeration number must be below 18 characters").optional(),
});

// .superRefine((data, ctx) => {
//   if (data.role === "student" && !data.registerationId) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Registeration ID is required for students.",
//       path: ["registerationId"],
//     });
//   }

//   if (data.role === "teacher" && !data.email) {
//     ctx.addIssue({
//       code: "custom",
//       message: " Email is required",
//       path: ["email"],
//     });
//   }
// }
// );
