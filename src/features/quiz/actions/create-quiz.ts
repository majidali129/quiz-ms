"use server";

import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isTeacher } from "@/features/utils/is-teacher";
import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { quizPath, quizzesPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

const questionSchema = z.object({
  questionText: z.string().min(5, "Question text must be at least 5 characters"),
  options: z.array(z.string().min(1, "Option cannot be empty")).min(2).max(6),
  correctOption: z.number().default(0),
});

const quizSettingsSchema = z.object({
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  maxAttempts: z.coerce.number().min(1, "Max attempts must be at least 1"),
  passingScore: z.coerce.number().min(1, "Passing score must be at least 1"),
  showAnswers: z.boolean().default(false).optional(),
});

const quizScheduleSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
});

const createQuizSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  course: z.string().min(1, "Please select a course"),
  quizType: z.enum(["Objective", "Subjective"], { message: "Quiz type can be either subjective or objective" }),
  difficulty: z.enum(["easy", "medium", "hard"], { message: "Difficulty can be either easy, medium or hard" }),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  settings: quizSettingsSchema,
  schedule: quizScheduleSchema,
});
export const createQuize = async (quizId: string | undefined, _initialState: ActionState, formData: FormData) => {
  await connectDB();
  try {
    const session = await getAuthOrRedirect();

    if (!isTeacher(session.user.role)) {
      return toActionState("ERROR", "Only teachers can create quizzes", formData);
    }

    const rawData = Object.fromEntries(formData);
    const { questions, duration, maxAttempts, passingScore, showAnswers, startDate, endDate, startTime, isActive } = rawData;
    if (typeof questions !== "string") {
      return toActionState("ERROR", "Questions data must be a JSON string");
    }

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
    } catch (e) {
      console.log("error", e);
      return toActionState("ERROR", "Invalid JSON format for questions");
    }
    const quizDataForValidation = {
      ...rawData,
      questions: parsedQuestions,
      settings: {
        duration,
        maxAttempts,
        passingScore,
        showAnswers,
      },
      schedule: {
        startDate,
        endDate,
        startTime,
        isActive,
      },
    };
    const validatedData = await createQuizSchema.parseAsync(quizDataForValidation);

    console.log("validatedData", validatedData, quizId);

    if (quizId) {
      const udpatedQuiz = await Quiz.findOneAndUpdate({ _id: quizId, createdBy: session.user.id }, validatedData);
      if (!udpatedQuiz) {
        return toActionState("ERROR", "Quiz not found or not authorized to update", formData);
      }
    } else {
      await Quiz.create({ ...validatedData, createdBy: session.user.id });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  revalidatePath(quizzesPath());
  if (quizId) {
    await setCookieByKey("toast", "Quiz updated successfully");
    revalidatePath(quizPath(quizId));
  }
  return toActionState("SUCCESS", quizId ? "Updated quiz" : "Created quiz");
};
