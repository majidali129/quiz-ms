import { z } from "zod";

const quizIdSchema = z
  .string()
  .min(1, "Please provide quiz id to define rules")
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid quiz ID format");

export const quizConstraintsSchema = z.object({
  quiz: quizIdSchema,
  duration: z
    .number()
    .min(1, "Minimum duration is 1 minute")
    .max(180, "Maximum duration is 180 minutes")
    .default(30),
  maxAttempts: z
    .number()
    .min(1, "At least 1 attempt must be allowed")
    .max(10, "Maximum attempts allowed are 10")
    .default(3),
  passingScore: z
    .number()
    .min(1, "Passing score must be at least 1%")
    .max(100, "Passing score cannot exceed 100%")
    .default(50),
  isActive: z.boolean().default(true),
  shuffleQuestions: z.boolean().default(false),
  shuffleOptions: z.boolean().default(false),
  startDate: z.string().date(), // like => 2020-01-01
  startTime: z.string().time(), // like => 09:52:31 , 23:59:59.9999999
});
