import { connectDB } from "@/lib/connect-db";
import { QuizResult } from "@/models/quiz-results.-model";
import { getAuth } from "../auth/queries/get-auth";
import { QuizResult as QuizResultType } from "../quiz/types";

export const getQuizResult = async (id: string): Promise<QuizResultType> => {
  await connectDB();
  const user = await getAuth();
  const quizResult = await QuizResult.findOne({ quiz: id, student: user.id }).populate({ path: "student", select: "_id userName picture " }).populate({ path: "quiz", select: "_id title" }).lean().exec();

  return JSON.parse(JSON.stringify(quizResult));
};
