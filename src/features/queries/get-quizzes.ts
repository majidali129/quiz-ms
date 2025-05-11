import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { Quiz as QuizType } from "../quiz/types";

export const getQuizzes = async (teacherId?: string): Promise<QuizType[]> => {
  await connectDB();

  if (teacherId) {
    return JSON.parse(JSON.stringify(await Quiz.find({ createdBy: teacherId }).populate({ path: "createdBy", select: "_id userName picture" }).populate({ path: "course", select: "_id title" }).lean().exec()));
  }

  return JSON.parse(JSON.stringify(await Quiz.find().populate({ path: "createdBy", select: "_id userName picture" }).populate({ path: "course", select: "_id title" }).lean().exec()));
};
