"use server";

import { auth } from "@/auth";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { quizzesPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

const questionSchema = z.object({
  questionText: z.string().min(5, "Question text must be at least 5 characters"),
  options: z.array(z.string().min(1, "Option cannot be empty")).min(2).max(6),
  correctOption: z.number().default(0),
});

const createQuizSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  course: z.string().min(1, "Please select a course"),
  quizType: z.enum(["Objective", "Subjective"], { message: "Quiz type can be either subjective or objective" }),
  quizDuration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  maxAttempts: z.coerce.number().min(1, "Max attempts must be at least 1"),
  passingScore: z.coerce.number().min(1, "Passing score must be at least 1"),
  difficulty: z.enum(["easy", "medium", "hard"], { message: "Difficulty can be either easy, medium or hard" }),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  startDate: z.string(),
  startTime: z.string(),
});
export const createQuize = async (_initialState: ActionState, formData: FormData) => {
  await connectDB();
  try {
    const session = await auth();
    const rawData = Object.fromEntries(formData);
    if (typeof rawData.questions !== "string") {
      return toActionState("ERROR", "Questions data must be a JSON string");
    }

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(rawData.questions);
    } catch (e) {
      console.log("error", e);
      return toActionState("ERROR", "Invalid JSON format for questions");
    }
    const quizDataForValidation = {
      ...rawData,
      questions: parsedQuestions,
    };
    const validatedData = await createQuizSchema.parseAsync(quizDataForValidation);
    await Quiz.create({ ...validatedData, createdBy: session?.user.userName });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  revalidatePath(quizzesPath());
  return toActionState("SUCCESS", "Quiz created successfully");
};
