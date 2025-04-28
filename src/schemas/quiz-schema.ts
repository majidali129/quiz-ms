import { z } from "zod";

export const quizSchema = z.object({
  quizType: z
    .enum(["subjective", "objective"], {
      message: "Quiz type can be either Subjective or Objective",
    })
    .default("objective"),
  title: z.string().min(5, "Quiz title must be 5 characters long"),
  description: z.string().optional(),
  course: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  questions: z
    .array(
      z.object({
        questionText: z.string().min(5, "Questions must be at least 5 characters long"),
        options: z.array(z.string()).min(2, "Two options mandatory for a question").max(6, "Maximum of 6 options allowed"),
        correctOption: z.number().min(0, "Correct option index must be at least 0"),
      })
    )
    .min(1, "At least one question is required"),
});
