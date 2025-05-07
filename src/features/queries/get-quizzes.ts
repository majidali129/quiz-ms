import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { Quiz as QuizType } from "../quiz/types";

export const getQuizzes = async (): Promise<QuizType[]> => {
  await connectDB();
  const quizzes = await Quiz.find().populate({ path: "createdBy", select: "_id userName picture" }).populate({ path: "course", select: "_id title" }).lean().exec();

  return JSON.parse(JSON.stringify(quizzes));
};
