import { z } from "zod";

export const applyQuizSchema = z.object({
  quizId: z
    .string()
    .min(1, "Please provide quiz id to apply")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid quiz ID format"),
});
