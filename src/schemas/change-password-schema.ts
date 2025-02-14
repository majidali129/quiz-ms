import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().trim().min(2, "Please enter your current password."),
  newPassword: z
    .string()
    .trim()
    .min(8, "Your new password must be at least 8 characters long.")
    .max(15, "Your new password cannot exceed 15 characters."),
});
