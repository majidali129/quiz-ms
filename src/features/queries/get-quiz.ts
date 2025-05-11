import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { Quiz as QuizType } from "../quiz/types";

export const getQuiz = async (quizId: string): Promise<QuizType> => {
  await connectDB();
  const quiz = await Quiz.findById(quizId).populate({ path: "createdBy", select: "_id userName picture" }).populate({ path: "course", select: "_id title category" }).lean().exec();
  return JSON.parse(JSON.stringify(quiz));
};
