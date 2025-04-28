import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";

export const getQuizzes = async () => {
  await connectDB();
  const quizzes = (await Quiz.find().lean().exec()).map((q) => ({ ...q, id: q._id.toString() }));

  return JSON.parse(JSON.stringify(quizzes));
};
