import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";

export const getQuiz = async (quizId: string) => {
  await connectDB();
  const quiz = await Quiz.findById(quizId).lean().exec();
  return JSON.parse(JSON.stringify(quiz));
};
